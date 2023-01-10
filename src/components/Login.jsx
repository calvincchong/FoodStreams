import React from 'react';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const Login = ({props}) => {

  return (
    <div>
      <p className="text-2xl font-bold underline">Login Component </p>
      <p className="text-xl"> Login component is displayed at url '/';</p>
      A centered form belongs here.
      TODO: Determine how quickly I can set up login or not login yes
      Live testing currently works:
      Some issue with the task breakdown
    </div>
  );
}

export default Login;