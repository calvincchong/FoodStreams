import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

const Login = ({props}) => {
  const [username, setUserName] = useState('');
  const navigate = useNavigate();



  return (
    <div>
      <p className="login_container text-2xl font-bold underline">Login Component </p>
      <p className="text-xl"> Login component is displayed at url '/';</p>
      <form className="login_form">
        <label> Please enter your username </label>
        <input
           type='text'
           name='username'
           id='username'
           required
           onChange={e => setUserName(e.target.value)}
           value={username}
        />
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default Login;