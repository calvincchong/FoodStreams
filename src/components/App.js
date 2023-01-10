import io from 'socket.io-client';
import axios from 'axios';
import { React, useState, useEffect } from 'react';

// components

export const App = () => {
  const[isConnected, setIsConnected] = useState(false);

  return (
    <div>
      <h1> Restaurant Orders</h1>
      It is {isConnected} that we are connected.
    </div>
  )
}

export default App;

