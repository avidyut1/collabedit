const PORT = 7000;
const io = require('socket.io').listen(PORT);

var sockets = [];
var hashids = [];
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'sakti',
    password : 'shiva',
    database : 'pad_development'
});
connection.connect();
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
        var query = "UPDATE pads SET data = '" + msg.data + "'WHERE hash_id = '" + msg.hash_id + "'";
        connection.query(query, function(err, rows, fields) {
            if (err) throw err;
        });
    });
    socket.on('disconnect', function() {
    	var index = sockets.indexOf(socket);
        sockets.splice(index, 1);
        hashids.splice(index, 1);
    });
});
