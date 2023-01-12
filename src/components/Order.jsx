import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Item from './Item.jsx';
import { Draggable } from '@hello-pangea/dnd';
// import { Draggable } from 'react-beautiful-dnd';

const Order = ({k, order, index}) => {
  const myRef = useRef(null);

  // index={index}
  //my-3 mx-2 p-2

  const [ enabled, setEnabled ] = React.useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
       cancelAnimationFrame(animation);
       setEnabled(false);
    };
  }, []);

  if (!enabled) {
      return null;
  }

  return(
    <div>
    <Draggable draggableId={order.id} index={index}>
      {provided => (
        <div key={order.id + index}className=' border border-gray-500 border-sky-500 min-h-1/10 max-h-20 overflow-y-auto'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div ref={myRef} key={order.id + index + 'order'}>
            {order.name}
            <div className='max-h-20 overflow-auto px-4'>
              {/* {order.items.map((item, i) => <Item key={index+i} item={item} />)} */}
            </div>
          </div>

        </div>
      )}
    </Draggable>
    </div>
  )
}

export default Order;

//TODO: Add Strike through for items that have been created already