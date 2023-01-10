import React from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const Login = ({props}) => {

  return (
    <div>
      <h2>Login Component </h2>
      Login component is displayed at url '/';
      A centered form belongs here.
      TODO: Determine how quickly I can set up login or not login
    </div>
  );
}

export default Login;