

var http = require('http')
, url = require('url')
, fs = require('fs')
, server;

server = http.createServer(function(req, res){
// parse the pathname as a url
var path = url.parse(req.url).pathname;
                   
switch (path){
    

	
	// serve up our html chat client file by writing it directly to the response
	case '/':
		fs.readFile(__dirname + '/chatclient2.html', function(err, data){
	    	if (err) return send404(res);
	        	res.writeHead(200, {'Content-Type': 'text/html'})
	            res.write(data, 'utf8');
	            res.end();
	     });	

    break;
    
    default: send404(res);
}
}), 

send404 = function(res){
    res.writeHead(404);
    res.write('404');
    res.end();
};

server.listen(18080, "127.0.0.1");
console.log("Server running at http://127.0.0.1:18080/");

var io = require('socket.io').listen(server);

//connection event
io.sockets.on('connection', function(socket){
	console.log("Connection " + socket.id + " accepted!");
	
	socket.on('disconnect', function(){
		console.log("Connection " + socket.id + " terminated!");
	});
	
	//receive message
	socket.on('message', function(message){
		console.log("Received " + message + "  -  from client  " +  socket.id);
		//relay message
		io.sockets.emit('chat', socket.id, message);
	});
	
	
});





