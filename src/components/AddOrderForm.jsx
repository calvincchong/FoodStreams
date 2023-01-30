import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import Board from './Board.jsx';
import Login from './Login.jsx';
import Notifications from './Notifications.jsx';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormLabel';
import FormControlLabel  from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// components

const AddOrderForm = ({ setShowForm, submitOrder }) => {
  // const [username, setUsername] = useState('')
  const [formFields, setFormFields] = useState({
    name: 'Calvin',
    phone: '',
    items: []
  });

  const handleOnChange = (e) =>  {
    const name = e.target.name;
    const value = e.target.value;

    setFormFields({
      ...formFields,
      [name]: value
    })
  };

  const appendOnItems = (e) => {
    console.log(e.target.value);
    const newItems = formFields.items.slice()
    newItems.push(e.target.value);
    setFormFields({
      ...formFields,
      items: newItems
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formFields)
    submitOrder(formFields)
    setShowForm(false)
  }



  return (
    <div className='fixed flex z-30 flex-col items-center space-x-2 justify-center bg-black/80 backdrop-blur-sm w-full h-full left-0 top-0 text-neutral-800'
    // onClick={() => {setShowForm(false)}}>
    >
      <div className='max-w-lg'> Add Order
      <Box sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }} >
          <TextField
              variant="outlined"
              required
              id="name"
              label="name"
              name="name"
              autoComplete="johndoe"
              onChange={handleOnChange}
              sx={{ m: 1 }}
            />

          {/* <TextField
              variant="outlined"
              required
              id="ph"
              label="name"
              name="name"
              autoComplete="johndoe"
              onChange={handleOnChange}
              sx={{ m: 1 }}
            /> */}

          <TextField
              variant="outlined"
              required
              id="phone"
              label="phone"
              name="phone"
              autoComplete="johndoe"
              onChange={handleOnChange}
              sx={{ m: 1 }}
          />

          {/* <TextField
              variant="outlined"
              required
              id="items"
              label="items"
              name="items"
              autoComplete={['Chicken Noodle Soup', 'Satay', 'Papaya Salad', 'Diet Coke']''}
              onChange={handleOnChange}
              sx={{ m: 1 }}
          /> */}

          <Button
            variant='contained'
            value='Satay'
            sx={{ margin: '5px'}}
            onClick={appendOnItems}>
              Add Satay
          </Button>

          <Button
            value='Salad'
            variant='contained'
            sx={{ margin: '5px'}}
            onClick={appendOnItems}>
              Add Salad
          </Button>

          <Button
            value='Diet Coke'
            variant='contained'
            sx={{ margin: '5px'}}
            onClick={appendOnItems}>
              Add Diet Coke
          </Button>

          <Button
            value='Diet Coke'
            variant='contained'
            sx={{ margin: '5px'}}
            onClick={onSubmit}>
              Submit Order
          </Button>
    </Box>


       </div>
    </div>
  );
}

export default AddOrderForm;
