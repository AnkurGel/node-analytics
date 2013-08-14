var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var redis = require('redis');
var client = redis.createClient();
console.log("Connected to Redis!");


server.listen(3000, 'localhost');

app.get('/', function(req, res){
  res.sendfile(__dirname + "/client.html");
});

io.sockets.on('connection', function(socket){
  console.log("CONNECTED");

  var subscribe = redis.createClient();
  //making this subscriber.
  subscribe.subscribe("realtime");

  subscribe.on('message', function(channel, message){
    console.log("Trying HGETALL " + message);
    var msg;
    if(msg)
      console.log("HGETALL " + message + ": " + msg);

    socket.send(message);
    client.hgetall(message.replace(/\n/,''), function(err, reply){
      console.log("---> IN HERE <---- ");
      if(reply!=null){
        //if results is retrieved successfully
        console.log("IN FUNCTION!! ")
        msg = reply;
        socket.emit("result",{result: JSON.stringify(msg)});
        //socket.send(JSON.stringify(msg));
      }
      if(err){
        console.log("----> IN ERR: " + err);
      }
    });

    console.log("Received from channel #" + channel + ": - " + message);
  });

  //Catch redis connetion error
  client.on('error', function(err){
    console.log("Error encountered: " + err);
  });

  //On disconnection, disconnect the subscrption channel
  socket.on('disconnect', function(){
    console.log("Disconnected ")
    subscribe.quit();
    client.quit()
  });
});

