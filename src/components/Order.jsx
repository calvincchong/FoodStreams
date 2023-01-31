import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Item from './Item.jsx';
import { Draggable } from '@hello-pangea/dnd';
// import { Draggable } from 'react-beautiful-dnd';

const Order = ({k, order, index}) => {
  const myRef = useRef(null);
  const [ enabled, setEnabled ] = React.useState(false);

  // useEffect(() => {
  //   const animation = requestAnimationFrame(() => setEnabled(true));

  //   return () => {
  //      cancelAnimationFrame(animation);
  //      setEnabled(false);
  //   };
  // }, []);

  // if (!enabled) {
  //     return null;
  // }

  return(
    <div>
    {order && <Draggable key={index} draggableId={order.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div key={index} className='mx-3 my-3 border border-gray-500 border-sky-500 min-h-1/10 overflow-y-auto bg-white shadow-lg'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isdragging={snapshot.isDragging}
        >
          <div ref={myRef} key={order.id + index + 'order'} className='flex flex-col'>
            <div className="p-2"> {order.name} </div>
            <div className='max-h-30 overflow-auto 5-5'>
              {order.items.map((item, i) => <Item key={index+i} item={item} />)}
            </div>
          </div>

        </div>
      )}
    </Draggable>}
    </div>
  )
}

export default Order;