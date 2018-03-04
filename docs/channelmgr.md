
Snowem's RESTful Service is responsible for channel management. It handles creating and destroying channels. Basically, a channel is a place where user can publish his/her stream and other can play a stream within the channel.

### Create Channel

There are two types of channels: `broadcast` and `conference`. A broadcast channel has only one publisher while a conference channel can have up to 5 concurrent publishers. On succcess, a channel identification number will be created. It can be used to publish/play a media stream.

**Syntax**  

```
SnowSDK.createChannel(config, onSuccess, onError)  
```

**Input**  

The argument _config_ has following field members:

| Field | Default | Description  
| --------- | ------- | -----------  
| name | none | Channel name.
| type | "broadcast" | Channel type which can be "broadcast" or "conference".

The callbacks _onSuccess_ and _onError_ are optional.  

**Return Value**  

On success, _onSuccess_ will be called with new created channel id, otherwise _onError_.

**Example Usage**  

```javascript
var config = { 
  'name': "snowem test room",
  'type': "broadcast"
  }   
function onSuccess(resp) {
  console.log("resp: " + resp.channelid);
  //for example, use channel id to publish your media stream
}
function onError(resp) {
  console.log("resp: " + resp);
}
SnowSDK.createChannel(config, onSuccess, onError);

```

### Query Channel Info

**Syntax**  

```
SnowSDK.queryChannel(config, onSuccess, onError)  
```

**Input**  

The argument _config_ has following field members:  

| Parameter | Default | Description  
| --------- | ------- | -----------  
| name | none | Channel name.
| channelid | none | Channel identifier.  
| ttl | 0 | Specify how long a channel live. 0 means channel will never expired.

Note: caller must provide either `name` or `channelid`.  

The callbacks _onSuccess_ and _onError_ are optional.  

**Return Value**  

On success, _onSuccess_ will be called with all information about the channel, otherwise _onError_.

**Example Usage**  

```javascript
var config = { 
   'name': "snowem room test",
   'channelid': 12345,
  
function onSuccess(resp) {
  // all channel info is in resp
  console.log("info: " + resp);
}
function onError(resp) {
  console.log("resp: " + resp);
}
SnowSDK.queryChannel(config, onSuccess, onError);
```

### Destroy Channel

**Syntax**  

```
SnowSDK.deytroyChannel(config, onSuccess, onError)
```

**Input**  

The argument _config_ has following field members:  

| Parameter | Default | Description  
| --------- | ------- | -----------  
| name | none | Channel name.
| channelid | one | Channel identifier.  

Note: caller must provide either `name` or `channelid`.  

The callbacks _onSuccess_ and _onError_ are optional.  

**Return Value**  

On success, _onSuccess_ will be called, otherwise _onError_.

**Example Usage**  

```
var config = { 
   'name': "snowem room test",
   'channelid': 12345,
  
function onSuccess(resp) {
  // successful to delete a channel
  console.log("info: " + resp);
}
function onError(resp) {
  console.log("resp: " + resp);
}
SnowSDK.deytroyChannel(config, onSuccess, onError);
```





