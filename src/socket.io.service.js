import { io } from 'socket.io-client';
let socket;

export const initiateSocketConnection = () => {
	socket = io('localhost:3000');
	console.log(`Connecting socket...`);
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}