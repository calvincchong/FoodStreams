import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Order from './Order.jsx';


// orders is an array of tasks that was mapped from the column list
const Column = ({column, orders}) => {
  return (
    <div className='Container mx-2 my-2 border-2 border-sky-500 flex flex-col min-w-200 overflow-y'>
      <div className='2xl flex flex-row justify-center'>
        <div>{column.title}</div>
      </div>
      <div className='OrderList py-2'>
        {orders.map(order => <Order key={order.id} order={order} /> )}
      </div>
    </div>
  )
}

export default Column;