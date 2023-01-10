import React from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const Board = ({props}) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:9000'); // url of the server is used to create socket
    // when connected
    socket.on('connect', (res) => {
      setIsConnected('true');
    });

    socket.on('time', (time) => {
      setIsConnected(time);
    });

    // use await to fetch dots

    socket.on('disconnect', () => {
      setIsConnected('Disconnected from Server');
    });
  }, []);

  return (
    <div>
      <h2> Order Board</h2>
      It is {isConnected} that we are connected.
    </div>
  );
}

export default Board;