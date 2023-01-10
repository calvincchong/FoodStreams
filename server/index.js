import express from  'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const PORT = 9000;
const app = express();
const httpServer = createServer(app);
// const io = new Server(httpServer. { /* options */})
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  },
  pingTimeout: 5000,
  pingInterval: 25000
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);


io.on('connection', (socket) => {
  console.log(`'${socket.id}' just connected`);
  socket.on('disconnect', (reason) => {
    socket.disconnect();
    console.log(`A user has disconnected. ${socket.id}`);
  });
});

// io.on('disconnect', () => {
//   io.disconnect();
//   console.log(`A user has disconnected.`);
// })

io.on('connection_error', (err) => {
  console.log(err.req);
  console.log(err.code);
  console.log(err.message);
  console.log(err.context);
})

app.get('/', (req, res) => {
  console.log(req);
  res.json({
    message: 'hello'
  });
});

httpServer.listen(PORT, () => {
  console.log('Server is running on', PORT);
});

