import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Item from './Item.jsx';

const Order = ({order}) => {
  return(
    <div className='my-3 mx-2 p-2 border border-gray-500 border-sky-500 min-h-1/10 max-h-20 overflow-y-auto'>
      {order.name}
      <div className='max-h-20 overflow-auto px-4'>
        {order.items.map(item => <Item item={item} />)}
      </div>
    </div>
  )
}

export default Order;

//TODO: Add Strike through for items that have been created already