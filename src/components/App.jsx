import React from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import Board from './Board.jsx';

// components

const App = ({props}) => {

  return (
    <div>
      <h1> Restaurant Orders</h1>
      HTML SHOWING that we are connected.
      <Board />
    </div>
  );
}

export default App;
