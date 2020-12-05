// const socketer = (server) => {
//   const socket = require('socket.io');

//   // Socket setup
//   const io = socket(server, {
//     cors: {
//       origin: 'http://localhost:3000',
//       methods: ['GET', 'POST'],
//     },
//   });

//   io.on('connection', function (socket) {
//     console.log('Made socket connection');

//     // socket.on("new user", function (data) {
//     //   socket.userId = data;
//     //   activeUsers.add(data);
//     //   io.emit("new user", [...activeUsers]);
//     // });

//     // socket.on("disconnect", () => {
//     //   activeUsers.delete(socket.userId);
//     //   io.emit("user disconnected", socket.userId);
//     // });

//     socket.on('hi', function (data) {
//       console.log(1111111);
//     });

//     // socket.on("typing", function (data) {
//     //   socket.broadcast.emit("typing", data);
//     // });
//   });

//   return io;
// };

// module.exports = socketer;
