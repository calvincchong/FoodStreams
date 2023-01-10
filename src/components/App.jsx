import React from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

// components

const App = ({props}) => {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div>
      <h1> Restaurant Orders</h1>
      It is {isConnected} that we are connected.
    </div>
  );
}

export default App;

