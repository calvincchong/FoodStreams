import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import Board from './Board.jsx';
import Login from './Login.jsx';
import Notifications from './Notifications.jsx';

// components

const AddOrderForm = ({props}) => {
  // const [username, setUsername] = useState('')

  return (
   <>
    Form should be here.
   </>
  );
}

export default AddOrderForm;
