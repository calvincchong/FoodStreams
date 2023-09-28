import React from "react";
import { useState, useEffect, useRef } from "react";
import Item from "./Item.tsx";
import { Draggable } from "@hello-pangea/dnd";
import OrderCard from "./OrderCard";
// import { Draggable } from 'react-beautiful-dnd';

const Order = ({ k, order, index }) => {
  const myRef = useRef(null);
  const [enabled, setEnabled] = React.useState(false);

  console.log(order, "in order component");

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

  return (
    <>
      {order && (
        <Draggable key={index} draggableId={order.id.toString()} index={index}>
          {(provided, snapshot) => (
            <div
              key={index}
              className="mx-3 my-3 rounded border border-gray-500 border-sky-500 min-h-1/10 overflow-y-auto bg-white shadow-sm"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isdragging={snapshot.isDragging}
            >
              <OrderCard ref={myRef} order={order} />
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};

export default Order;
