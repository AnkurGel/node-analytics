#node-analytics

##Description
This is a node application interacting with Redis via [Pub/Sub](http://en.wikipedia.org/wiki/Publish/subscribe) system.   
It is subscribing to a channel named `realtime`; the data is published via a Django application to Redis.

Also uses [`angular.js`](http://angularjs.org/) to update the DOM as soon as the client receives the change in model.

##Usage
`npm install socket.io redis hiredis express`
`node index.js`

##Todo: 
* Fight with the custom emitter, which sometimes _do not_ emit the change.
* Make a generalized `package.json`. 
* Almost everything at front-end.

##Copyright
Copyright (c) 2013 Ankur Goel

