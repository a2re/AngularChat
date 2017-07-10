import Message from './models/message';

export default function useSocket(server) {
    const io = require('socket.io')(server);

    let users = {};
    io.on('connection', function (socket) {

      socket.on('login', (username) => {
        if (users[username] === undefined) {
          socket.username = username;
          users[username] = socket.id;
        }
        Message.find({$or: [{sender: username}, {receiver: username}]}, (err, docs) => {
          if (err) { return console.error(err); }
          io.emit('logged', {connectedUsers: Object.keys(users), messages: docs });
        });
      });

      socket.on('message', (message) => {
        message.sender = socket.username;
        console.log(message, socket)
        let msg = new Message({
          sender: message.sender,
          receiver: message.receiver,
          content: message.content,
          date: message.date
        });
        msg.save((err, data) => {
          if (err) throw err;
          console.log(err, data)
          socket.emit('message', message);
          var dest = io.sockets.connected[users[message.receiver]];
          if (dest !== undefined) {
            io.sockets.connected[users[message.receiver]].emit('message', message);
          }
        });
      });

      socket.on('disconnect', disconnection);
      socket.on('disconnection', disconnection);

      function disconnection() {
        delete users[socket.username];
        io.emit('disconnect', socket.username);
      }
    });
    
}
