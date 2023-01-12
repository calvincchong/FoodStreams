import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Droppable } from '@hello-pangea/dnd';
// import { StrictModeDroppable } from './StrictModeDroppable.jsx';
import Order from './Order.jsx';

// orders is an array of tasks that was mapped from the column list
const Column = ({column, orders, index}) => {
  const myRef = useRef(null);

  // const [ enabled, setEnabled ] = React.useState(false);

  // React.useEffect(() => {
  //   const animation = requestAnimationFrame(() => setEnabled(true));

  //   return () => {
  //      cancelAnimationFrame(animation);
  //      setEnabled(false);
  //   };
  // }, []);

  // if (!enabled) {
  //     return null;
  // }


  return (

    <div key={column.id} className='Container mx-2 my-2 border-2 border-sky-500 flex flex-col min-w-200 overflow-y'>
      <div className='2xl flex flex-row justify-center'>
        <div>{column.title}</div>
      </div>
      <Droppable key={column.id + 'drop'}droppableId={column.id} index={index}>
        {(provided) => (
          <div className='OrderList py-2' ref={provided.innerRef} {...provided.droppableProps}>
            <div>
              {orders.map((order, index)=>
                <Order order={order} index={index} /> )}
            </div>
              {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Column;