var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var mexp = require('math-expression-evaluator');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('expression', function(msg){
      var result = '';
      try {
          result = msg + ' = ' + mexp.eval(msg);
      }
      catch (err) {
        result = 'Can\'t understand: ' + msg;
      }
      
      io.emit('result', result);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});