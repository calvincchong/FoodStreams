import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import Board from './Board.jsx';
import Login from './Login.jsx';
import Notifications from './Notifications.jsx';

// components

const App = ({props}) => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Board />} />
        <Route path='board' element={<Login />} />
        <Route path='/notifications' element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
