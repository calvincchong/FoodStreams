import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

const Login = ({props}) => {
  const [username, setUserName] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    e.preventDefault();
    localStorage.setItem('userId', username);
    setUserName('');
    navigate('/board')
  };

  return (
    <div>
      <p className="login_container text-2xl font-bold underline">Login Component </p>
      <p className="text-xl"> Login component is displayed at url '/';</p>
      <div className='fixed flex z-30 flex-col items-center space-x-2 justify-center bg-black/50 backdrop-blur-sm w-full h-full left-0 top-0 text-neutral-800'>
        <form className="login_form z-200 flex-initial w-10/12 sm:w-6/12 bg-slate-100 py-3 my-4 rounded-xl
                        shadow-md relative overflow-auto max-h-full min-h-1/10" onSubmit={handleLoginClick}>
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
    </div>
  );
}

export default Login;