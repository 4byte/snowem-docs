
Stream management in Snowem framework is handled through the _PeerAgent_ interface.  

### Peer Object

The _PeerAgent_ interface represents a wrapper of WebRTC connection between local device and Snowem media server. It provides methods to connect a media server, publish and play a media stream in a channel.

PeerAgent Constructor  

**Syntax**  

```
var peer = new SnowSDK.PeerAgent(config)  
```

**Input**  

| Parameter | Default | Description  
| --------- | ------- | -----------  
| wss_ip | none | The domain name of Snowem's websocket server.  
| wss_port | 443 | Port number on which Snowem's websocket server listens.  

Note: you must define `wss_ip` in configuration parameters.  

**Return Value**  

On success, a _peer_ object is return, null otherwise.  

**Example Usage**  

```javascript
var config = { 
   'servername': "snowem.example.com",
   'port': 443,
   'media_constraints' : { audio: true, 
                           video: {
                              mandatory:{
                                 maxWidth: 480,
                                 maxHeight: 270,
                                 minWidth: 480,
                                 minHeight: 270 
                          }}},
    'peerconnection_config' : {'iceServers':[{'urls':'stun:stun.l.google.com:19302',
                                                   'urls':'stun:stun1.l.google.com:19302'}],
                                    'iceTransports': 'all'},
    'sdp_constraints' : {'mandatory': {
         'OfferToReceiveAudio':true,
         'OfferToReceiveVideo':true }}
   }   
var peer = new SnowSDK.PeerAgent(config);
```

### Event Handlers

Events will be broadcasted from Snowem media server to inform peers in a channel about new streams and deleted streams. The _PeerAgent_ interface has two properties to catch these events: _onAddPeerStream_ and _onRemovePeerStream_.

**Syntax**

```
PeerAgent.onAddPeerStream = function(info){}
PeerAgent.onRemovePeerStream = function(info){}
```

In _onAddPeerStream_, the argument _info_ contains peer identifier id _peerid_ of a remote stream and _stream_ of the remote stream object.  
In _onRemovePeerStream_, the argument _info_ contains only peer identifier _peerid_ of a remote stream.  

**Example Usage**  

```
peer.onAddPeerStream = function(info) {
  console.log("peerid: ", info.peerid);
  //make use of remote stream
  //remote_video_elm.srcObject = info.stream;
}
peer.onRemovePeerStream = function(info) {
  console.log("removing stream from peerid: " + info.peerid);
}
```

### Publish Media Stream

**Syntax**  

```
PeerAgent.publish(config)  
```

**Input**  

The argument _config_ has following field members:  

| Parameter | Default | Description  
| --------- | ------- | -----------  
| channelid | none | Channel ID of Peer object.  
| local_video_elm | none | ID of video tag which local stream will attach to.  

**Return Value**  

Return nothing except for events will be broadcasted from Snowem media server.

**Example Usage**  

```
var settings = { 
   'channelid': peer.channelId, 
   'local_video_elm': document.getElementById('localVideo')
};  
peer.onAddPeerStream = function(info) {
  console.log("peerid: ", info.peerid);
  //make use of remote stream
  //remote_video_elm.srcObject = info.stream;
}
peer.onRemovePeerStream = function(info) {
  console.log("removing stream from peerid: " + info.peerid);
}
peer.publish(settings);
```

### Play Media Stream

**Syntax**  

```
PeerAgent.play(config)  
```

**Input**  

| Parameter | Default | Description  
| --------- | ------- | -----------  
| channelid | none | Channel ID of Peer object.  

**Return Value**  

Return nothing except for events will be broadcasted from Snowem media server.  

**Example Usage**  

```
var config = { 
   'channelid': peer.channelId,
   'remote_video_elm': document.getElementById('remoteVideo')
};  
peer.onAddPeerStream = function(info) {
  console.log("peerid: ", info.peerid);
  //make use of remote stream
  //remote_video_elm.srcObject = info.stream;
}
peer.onRemovePeerStream = function(info) {
  console.log("removing stream from peerid: " + info.peerid);
}

peer.publish(config);

```

### Stop Media Stream

**Syntax**  

```
PeerAgent.stop(channelid)  
```

**Input**  

| Parameter | Default | Description  
| --------- | ------- | -----------  
| channelid | none | Channel ID of Peer object.  

**Return Value**  

Return nothing.

**Example Usage**  

```
var channelid = 12345
peer.stop(12345);
```







