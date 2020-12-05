const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const auth = require('./routes/api/auth');
const socket = require('socket.io');
const router = express.Router();
const chokidar = require('chokidar');
app.use(cors());

//Connect Db
connectDB();

// Init middleware

app.use(express.json({ extended: false }));

app.use('/api/auth', auth);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Socket setup
const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', function (socket) {
  console.log('Made socket connection');
});

let watcher;
let dir;
let events = {};

app.use(
  router.post('/api/watcher/start', [], async (req, res) => {
    try {
      dir = req.body.path;
      console.log('dir', dir);
      events[dir] = [];
      watcher = chokidar.watch(dir, {
        ignored: /^\./,
        persistent: true,
      });

      watcher
        .on('add', (data) => {
          const msg = { msg: `File ${data} has been added` };
          events[dir].push(msg);
          console.log('File', data, 'has been added');
          io.sockets.emit('super event', msg);
        })
        .on('addDir', function (data) {
          const msg = { msg: `Directory ${data} has been added` };
          events[dir].push(msg);
          console.log('Directory ', data, 'has been added');
          io.sockets.emit('super event', msg);
        })
        .on('unlinkDir', (data) => {
          const msg = { msg: `Directory ${data} has been removed` };
          events[dir].push(msg);
          console.log(`Directory ${data} has been removed`);
          io.sockets.emit('super event', msg);
        })
        .on('change', function (data) {
          const msg = { msg: `File ${data} has been changed` };
          events[dir].push(msg);
          console.log('File', data, 'has been changed');
          io.sockets.emit('super event', msg);
        })
        .on('unlink', function (data) {
          const msg = { msg: `File ${data} has been removed` };
          events[dir].push(msg);
          console.log('File', data, 'has been removed');
          io.sockets.emit('super event', msg);
        });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }),

  router.post('/api/watcher/stop', [], async (req, res) => {
    try {
      await watcher.unwatch(dir);
      console.log('stop');
      events[dir] = null;
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }),

  router.get('/status', [], async (req, res) => {
    try {
      return res.json(events[dir]);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  })
);
