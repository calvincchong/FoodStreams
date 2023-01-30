import React from 'react';
import { useState, useEffect, useRef } from 'react';

const Item = ({item}) => {
  return(
    <div className='border border-gray-200 border-sky-500 mx-4 px-2'>
      <label>
        <input type='checkbox' />
         {item}
      </label>
    </div>
  )
}

export default Item;