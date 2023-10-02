import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import Board from "./Board.jsx";
import Login from "./Login.jsx";

// components

const App = () => {
  // const [username, setUsername] = useState('')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="board" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
