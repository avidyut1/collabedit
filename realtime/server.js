const PORT = 7000;
const io = require('socket.io').listen(PORT);

var sockets = [];
var hashids = [];
io.sockets.on('connection', function(socket){
	//subscriber redis client for this socket
    sockets.push(socket);
    socket.on('hash_id', function(msg) {
        var index = sockets.indexOf(socket);
        hashids[index] = msg.hash_id;
    });
    socket.on('data', function (msg){
        var index = sockets.indexOf(socket);
        for(var i = 0; i < sockets.length; i++) {
            if (index === i) {
                continue;
            }
            if (hashids[i] === msg.hash_id) {
                sockets[i].emit('newdata', {'data': msg.data});
           }
       }
    });
    socket.on('disconnect', function() {
    	var index = sockets.indexOf(socket);
        sockets.splice(index, 1);
        hashids.splice(index, 1);
    });
});
