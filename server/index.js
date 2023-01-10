import express from  'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const PORT = 9500;
const app = express();
const httpServer = createServer(app);
// const io = new Server(httpServer. { /* options */})
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);


io.on('connection', (socket) => {
  console.log(`'${socket.id}' just connected`);
  io.on('disconnected ', () => {
    console.log(`A user has disconnected.`);
  })
});

app.get('/', (req, res) => {
  console.log(req);
  res.json({
    message: 'hello'
  });
});

httpServer.listen(PORT, () => {
  console.log('Server is running on', PORT);
});

