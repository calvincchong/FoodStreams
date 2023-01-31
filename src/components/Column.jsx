import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Droppable } from '@hello-pangea/dnd';
// import { StrictModeDroppable } from './StrictModeDroppable.jsx';
import Order from './Order.jsx';

// orders is an array of tasks that was mapped from the column list
const Column = ({column, orders, index}) => {
  const myRef = useRef(null);

  const [ enabled, setEnabled ] = React.useState(false);

  React.useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
       cancelAnimationFrame(animation);
       setEnabled(false);
    };
  }, []);

  if (!enabled) {
      return null;
  }
  console.log('after submitting orders,', orders)
  // console.log('inside column why dont orders work', orders, index);

  return (
    <div key={column.id} className='Container mx-2 my-2 border-2 border-sky-500 flex flex-col min-w-400 max-w-400 overflow-y bg-white/50'>
    {orders && <>
      <div className='2xl flex flex-row justify-center'>
        <div className='Column-title text-l pt-2'>{column.title}</div>
      </div>
      <Droppable key={column.id} droppableId={column.id} index={index} direction='vertical'>
        {(provided) => (
          <div className='OrderList py-2 grow min-h-1/10' ref={provided.innerRef} {...provided.droppableProps}>
            {/* <div> */}
              {orders.map((order, index)=> {
                // console.log('inside column, first index, then orders', index,  orders);
                return (<Order key={order.id} order={order} index={index} />)
              }
                 )}
            {/* </div> */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      </>}
    </div>
  )
}

export default Column;