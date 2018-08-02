This document is intended to help developers set up Snowem service and write web applications.

### Introduction
Snowem is a lightweight live streaming server, based on webrtc technology. Snowem has three built-in subsystems, which are designed for developers to easily integrate media streams into web applictions. 

 * `RESTful Web Service` is used for channel management.
 * `Websocket Sevrer` plays a role of signaling service in WebRTC stack.
 * `Media Server` is basically SFU in WebRTC stack, it handles ICE protocol and forward media streams among peers.

Let's start to setup Snowem.

### Snowem Installation

Snowem depends on the following libraries to build:  

 * libopenssl.  
 * libevent v2.1.xxx with openssl support.  
 * libnettle.  
 * libjansson.  
 * libsofia-sip-ua.  
 * libsrtp.  
 * libconfig.  
 * libbsd.

Notes: 

 * on Ubuntu system, one may install the following packages:

```
apt-get install libssl1.0.0 libssl-dev libevent-dev libsofia-sip-ua-dev\
libsofia-sip-ua0 libsrtp0 libsrtp0-dev libjansson-dev libjansson4\
libnettle6 nettle-dev libconfig9 libconfig-dev libbsd0 libbsd-dev
```
 
 * for installing libevent 2.1.xx, one may do the following:  
 
```
wget https://github.com/libevent/libevent/releases/download/release-2.1.8-stable/libevent-2.1.8-stable.tar.gz
tar xfz libevent-2.1.8-stable.tar.gz 
cd libevent-2.1.8-stable
./configure --prefix=/usr/local
make && make install
```

To build Snowem, execute the following commands: 

```
git clone https://github.com/jackiedinh8/snowem.git
cd snowem
git submodule init
git submodule update
mkdir build
cd build
cmake ..
make
make install
```

The configuration file is written in format of libconfig. To properly configure Snowem, one needs to provide certificates for both built-in websocket server and media server to establishing secure video streams. Basically, it looks like this:

```
//certificate used by built-in websocket server.
wss_cert_file = "<path-to>/wss_fullchain.pem"
wss_key_file = "<path-to>/wss_privkey.pem"
wss_bind_ip = "<ip_of_websocket_server>"
wss_bind_port = 443
//certificate used by media server.
ice_cert_file = "<path-to>/ice_fullchain.pem"
ice_key_file = "<path-to>/ice_privkey.pem"
// TRACE: 0, INFO: 1, DEBUG: 2, WARN: 3, ERROR: 4, FATAL: 5
log_level = 0
```

Note: one may find configuration sample file at [snowem.conf](https://github.com/jackiedinh8/snowem/blob/master/sample/snowem.conf). To run Snowem, simple execute:

```
snowem <path-to>/snowem.conf
```

### Setup Demo 

Assume snowem server runs on ip address x.y.z.t. Login to that server, if you do not have nodejs and express framework, install them:
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```
Download demp application from javascript sdkand modify js/app.js to point to correct Snowem server by setting 'wss_ip' to x.y.z.t.
```
git clone https://github.com/snowem/sdkjs.git
cd sdkjs
npm install
node index.js
```
Open chrome browser on https://x.y.z.t:8000.

### SDK Integration
Steps to integrate video streams using javascript sdk.  

**Step 1**: Integrate directly SnowSDK javascript sdk into your web application.    
When SnowSDK is loaded, it invokes snowAsyncInit if it is defined. Once it is called, you can initlialize SnowSDK with init function. The init function requires domain name or ip address of Snowem Websocket Service.

```
// put these lines in your html code.
<script type="text/javascript" src="js/adapter.js"></script>
<script type="text/javascript" src="js/snowsdk.js"></script>
```

```
window.snowAsyncInit = function() {
  var config = { 
    'ip': "your-wss-ip",
    'port': 443
  };  
  SnowSDK.init(config);
  start_app();
}

function start_app() {
  // start your code here
}
```

**Step 2**: Create Stream object.  
Stream object is used to capture media content from camera or html video tag.

```
var config = {
  'audio': true,
  'video': true
 };
 var stream = new SnowSDK.Stream(config);
```

**Step 3**: Create a channel and publish/play a stream Channel object is used to communicate with snowem server. Once a channel is obtained, local stream can be published on it or remote stream can be locally played.

```
function onSuccess(channel) {
  // channel object contain all needed info, see docs for details
  channel.listen("onConnected", function() {
   // after successfully connecting to snowem server, a stream can be published on the channel.
   channel.publish(existingStream);
  }); 

  channel.listen("onAddStream", function(stream) {
   // stream object contain media stream which can be play by channel.play
   channel.play(stream);
  }); 

  channel.listen("onRemoveStream", function(stream) {
   // stream object to be removed.
  }); 
  // connect channel to snowem server.
  channel.connect();  
}
function onError(resp) {
  console.log("resp: " + resp);
}
var config = { 
  'name': "test",
  'type': "conference",
  'key': "none"
}  
SnowSDK.createChannel(config, onSuccess, onError);
```

### Further Resource

Check out our javascript sdk [here](https://github.com/snowem/sdkjs/blob/master/js/app.js) for more details of using th sdk.  
For full documentation, check [here](sdk.md).




