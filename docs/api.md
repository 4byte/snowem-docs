
Welcome to the Snowem API Reference!

### SnowSDK object
SnowSDK is a global object which is used to send request/receive response from Snowem REST Service.

| Method | Description | Usage   
| --------- | ----------- | -------------  
| init | Set global config such as server address, etc | SnowSDK.init(config)  
| createChannel | Create a channel at snowem server | SnowSDK.createChannel(config)  
| queryChannel | Query channel info from snowem server | SnowSDK.queryChannel(config)  
| deleteChannel | Delete channel info from snowem server | SnowSDK.deleteChannel(config)  


### Channel object
Channel is an object which is used to publish/play streams within a channel using Snowem Websocket Service as signaling part.

| Field | Description   
| --------- | -----------  
| id | Channel identification  
| name | Channel name  
| key | Channel key string  
| ipaddr | IP address of Snowem Websocket Service   
| port | Port of Snowem Websocket Service   
| type | Channel type: "broadcast", "conference" and "p2p"   
| isReady | Status of channel   
| publishStreams | List of local published streams   
| remoteStreams | List of remote published streams   

| Method | Description | Usage   
| --------- | ----------- | -------------  
| connect | Connect to snowem server using websocket. Room name is needed. On return, room id is used to communicate with snowem server |  
| disconnect | Disconnect a channel from snowem server |  
| sendMsg | Send messages to snowem server. It is used by stream.sendMsg to impl signaling communication |  
| sendChannelMsg | Broadcast messages to a channel. The event channel.onChannelMessag will be triggered at other endpoints |  
| publish | Publish a stream to snowem server. It initiates ice handshake for a stream. When ice connection is established on a stream, event stream.onConnected will be triggered |  
| play | Play a remote stream |  
| stop | Stop a stream from publishing or playing |  
| listen | Set up listeners on the following events: |  
|  | Event channel.onConnected is trigger when websocket is connected |  
|  | Event channel.onDisconnected is triggered when websocket is disconnected |  
|  | Event channel.onAddStream is triggered when a remote stream is published on server |  
|  | Event channel.onRemoveStream is triggered when a remote stream is removed on server |  
|  | Event channel.onChannelMessage is triggered when there is message from server|  

### Stream object

| Method | Description | Usage   
| --------- | ----------- | -------------  
| init | Set media settings such as audio, video, data and their properties |  
| publish | Publish a local stream to Snowem server |  
| play | Play a stream (it couble be local or remote) |  
| stop | Stop publishing/playing a stream |  
| listen | Set up listeners on the following events: |  
|  | Event stream.onMessage is triggered when there is message from remote endpoints |  
|  | Event stream.onConnected is triggered when ICE connection is established |  
|  | Event stream.onReady is triggered when media is ready for playing |  




