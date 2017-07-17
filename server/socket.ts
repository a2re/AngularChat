import Message from './models/message';

export default function useSocket(server) {
    const io = require('socket.io')(server);

    let users = {};
    io.on('connection', function (socket) {
      socket.on('login', (username) => {
        if (users[username] === undefined) {
          socket.username = username;
          users[username] = (users[username] || []).concat([socket.id]);
        }
        Message.find({$or: [{sender: username}, {receiver: username}]}, (err, docs) => {
          if (err) { return console.error(err); }
          io.emit('logged', {connectedUsers: Object.keys(users), messages: docs });
        });
      });

      socket.on('message', (message) => {
        message.sender = socket.username;
        let msg = new Message({
          sender: message.sender,
          receiver: message.receiver,
          content: message.content,
          date: message.date
        });
        msg.save((err, data) => {
          if (err) throw err;
          socket.emit('message', message);
          let socketIds = users[message.receiver];
          if (!socketIds) return;
          socketIds.forEach(socketId => {            
            let receiverSocket = io.sockets.connected[socketId];
            if (receiverSocket !== undefined) {
              receiverSocket.emit('message', message);
            }
          });
        });
      });

      socket.on('disconnect', disconnection);
      socket.on('disconnection', disconnection);

      function disconnection() {
        users[socket.username] = (users[socket.username] || []).filter(id => id !== socket.id);
        if(users[socket.username].length === 0) delete users[socket.username];
        io.emit('disconnect', socket.username);
      }
    });
    
}
