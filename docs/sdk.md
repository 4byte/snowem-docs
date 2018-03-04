
### Snowem Installation

Snowem depends on the following libraries to build:  

 * libopenssl.  
 * libevent with openssl support.  
 - libnettle.  
 - libjansson.  
 - libsofia-sip-ua.  
 - libsrtp.  
 - libconfig.

Notes: on Ubuntu system, one may install the following packages:

```
apt-get install libssl1.0.0 libssl-dev libevent-2.0-5 libevent-openssl-2.0-5\
libevent-dev libsofia-sip-ua-dev libsofia-sip-ua0 libsrtp0 libsrtp0-dev\
libjansson-dev libjansson4 libnettle6 nettle-dev libconfig9 libconfig-dev
```

To build Snowem, execute the following commands: 

```
git clone https://github.com/jackiedinh8/snowem.git
cd snowem
mkdir build
cd build
cmake ..
make
make install
```

The configuration file is written in format of libconfig. To properly configure Snowem, one needs to provide certificates for both built-in websocket server and media server to establishing secure video streams. The configuration file has following options:  

| Option | Default | Description  
| --------- | ------- | -----------  
| wss_cert_file | none | Ceritifcate file for secure websocket service.
| wss_key_file | none | Key file for secure websocket service.
| wss_bind_ip | none | Ip address on which websocket service listens.
| wss_bind_port | 443 | TCP port on which websocket service listens.
| rest_cert_file | none | Ceritifcate file for RESTful service.
| rest_key_file | none | Key file for secure RESTful service.
| rest_bind_ip | none | Ip address on which RESful service listens.
| rest_bind_port | 8868 | TCP port on which RESTful service listens.
| ice_cert_file | none | Ceritifcate file for WebRTC connection.
| ice_key_file | none | Key file for WebRTC connection.
| log_level | 3 | Log level.

Note that secure websocket and RESTful servers can share the same certificate and key files. By default, RESTful service uses the same certificate and key files, which are set for secure websocket. Basically, it looks like this:  

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

Note: one may find configuration sample file at [snowem.conf](https://github.com/jackiedinh8/snowem/blob/master/sample/snowem.conf). You may follow the below instruction to generate certificates for and media servers. For secure websocket, you can get free certificate service from [letenscrypts](https://letsencrypt.org).  

```
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out certificate.crt
```

To run Snowem, simple execute:

```
snowem <path-to>/snowem.conf
```

### SDK Loading and Initialization

The following snippet will load SnowSDK javascript. If you host your snowsdk.js yourself, change the path to it accordingly.  

```
(function(d){
  var js, id = 'snowsdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "https://snowem.io/js/snowsdk.js";
  ref.parentNode.insertBefore(js, ref);
}(document));

window.snowAsyncInit = function() {
   var config = { 
      'ip': "your-wss-ip",
      'port': 443
   };  
   SnowSDK.init(config);

   //start your code here
   console.log("start your app here");
   start_app();
}
```

When SnowSDK is loaded, it invokes _snowAsyncInit_ if it is defined. Once it is called, you can initlialize SnowSDK with _init_ function. The _init_ function requires domain name or ip address of Snowem Websocket Service.


