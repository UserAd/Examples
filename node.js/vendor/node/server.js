var http = require('http');
var io = require('./lib/socket.io/lib/socket.io');
var url = require('url');
var sys = require('sys');
var redis = require('./lib/redis-node-client/lib/redis-client').createClient();

server = http.createServer(function(req, res){
  var path = url.parse(req.url).pathname;
  switch (path){
      case '/':
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.write('<h1>Welcome. Try the <a href="/">Blog</a> example.</h1>');
          res.end();
      break;
                                                                              
      default:
          
      break;
  }
});

server.listen(3333);

var clients = [];
var subscriptions = [];

// socket.io, I choose you
var socket = io.listen(server);

socket.on('connection', function(client) {
  // new client is here!
  client.on('message', function(message) {
		sys.debug('Received post subscription to post ' + message);
			if (clients[message] == null)
			{
				clients[message] = [];
			}
			clients[message][client.sessionId] = client;
			subscriptions[client.sessionId] = message;
		}
	);
  client.on('disconnect', function() {
		var post_id = subscriptions[client.sessionId];
		delete(subscriptions[client.sessionId]);
		delete(clients[post_id][client.sessionId]);
	});
});

redis.subscribeTo('example:posts:*', function(channel, data) {
	var post_id = channel.toString().split(':')[2];
	for(var client in clients[post_id])
	{
		clients[post_id][client].send(data);
	}
});