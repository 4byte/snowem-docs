
Welcome to the Snowem's API documentation. 

### Create Peer object

To publish or play a video stream, you need to create a Peer object. The Peer object provides all APIs to work with video streams. To create Peer object, one needs to provide configurataion for it.  

**Syntax**  

```
var peer = SnowSDK.createPeer(config)  
```

**Input**  

| Parameter | Default | Description  
| --------- | ------- | -----------  
| servername | none | The domain name of snowem server.  
| port | 443 | Port number on which snowem server listens  
| media_constraints | "" | Webrtc media settings. For details, see here.  
| peerconnection_config | "" | Webrtc peerconnection settings. For details, see here.  
| sdp_constraints | "" | Webrtc sdp settings. For details, see here.  

Note: you must define `servername` in configuration parameters.  

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

var peer = SnowSDK.createPeer(config);

```

### Create A Channel

Basically, a video stream is identified by a channel id - an integer.  

**Syntax**  
```
peer.createChannel(configuration, callback)  
```

**Input**

| Parameter | Default | Description  
| --------- | ------- | -----------  
| name | "" | Name of channel.  

**Return Value**  
On success, _callback_ will be called with Peer object as its first argument. Note that Peer object also containt valid channel id.

**Example Usage**

```
function onChannelCreated(peer) {
  // example of publish a strem
  var settings = { 
     'channelid': peer.channelId,
     'localVideoId': document.getElementById('localVideo'),
     'remoteVideoId': null
  };  
  peer.publish(settings);
}
peer.createChannel({name: "demo"},onChannelCreated);  
```

### Publish A Channel

**Syntax**  

```
peer.publish(settings)  
```

**Input**
| Parameter | Default | Description  
| --------- | ------- | -----------  
| channelid | none | Channel ID of Peer object.  
| localVideoId | none | ID of video tag which local stream will attach to.  

**Return Value**  

**Example Usage**  

```
var settings = { 
   'channelid': peer.channelId,
   'localVideoId': document.getElementById('localVideo')
};  
peer.publish(settings);
```

### Play A Channel

**Syntax**  

```
peer.play(settings)  
```

**Input**
| Parameter | Default | Description  
| --------- | ------- | -----------  
| channelid | none | Channel ID of Peer object.  
| remoteVideoId | none | ID of video tag which remote stream will attach to.  

**Return Value**  

**Example Usage**  

```
var settings = { 
   'channelid': peer.channelId,
   'remoteVideoId': document.getElementById('remoteVideo')
};  
peer.publish(settings);

```





