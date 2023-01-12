import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import io from 'socket.io-client';
import axios from 'axios';
import initialData from '../../fixtures/Orders.js';
import Column from './Column.jsx';

const Board = ({props}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState(initialData);

  // useEffect(() => {
  //   const socket = io('http://localhost:9000'); // url of the server is used to create socket
  //   // when connected
  //   socket.on('connect', (res) => {
  //     setIsConnected('true');
  //   });

  //   socket.on('time', (time) => {
  //     setIsConnected(time);
  //   });

  //   // use await to fetch dots

  //   socket.on('disconnect', () => {
  //     setIsConnected('Disconnected from Server');
  //   });
  // }, []);

  const onDragEnd = (result) => {
    console.log(result);
    const { destination, source, draggableId } = result;
    console.log('what is the destination', destination);
    console.log('source', source);
    console.log('draggableId', draggableId);

    // do nothing if it is not within bounds of a working droppable.
    if (!destination) {
      return;
    }

    // do nothing if it is moved to the same place.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log('card hasnt moved');
      return;
    }

    // look up the column within this state by looking at
    // looking up with the droppableID (which we have set to be the same as state)

    const column = data.columns[source.droppableId];
    console.log('finding the column in the data', column);
    const newOrderIds = Array.from(column.orderIds);
    console.log('this is new OrderIds from new array', newOrderIds);
    newOrderIds.splice(source.index, 1);
    console.log('after splice', newOrderIds);
    newOrderIds.splice(destination.index, 0, draggableId);

    console.log('this is new orderIds after slicing', newOrderIds)
    const newColumn = {
      ...column,
      orderIds: newOrderIds
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newColumn.id]: newColumn
      }
    };

    console.log('this is the new State', newState);

    setData(newState);
  };

  return (
    <div className="board-main-content flex flex-col min-h-8/10">
      <div className="board-header">This is on top</div>
      <h2> Order Board</h2>
      <div>It is {isConnected} that we are connected.</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-canvas flex flex-row min-h-8/10">

          {data.columnOrder.map((columnId, index) => {
            const column = data.columns[columnId];
            const orders = column.orderIds.map(taskId => data.orders[taskId]);

            return <Column className='' column={column} orders={orders} index={index}/>
          })};

        </div>
      </DragDropContext>

    </div>
  );
}

export default Board;


/**
 * <div className='pending-wrapper basis-1/3'>
          <h3>Pending</h3>
          <div className='ko-list flex-col  min-h-8/10'>
            <div className='listWrapper'>
            </div>
          </div>
        </div>

        <div className='working-wrapper flex-col min-h-8/10 basis-1/3'>
          <h2 className='3xl'>Working On</h2>
          <div className="working-card-container border-2  border-sky-500 min-h-full">
            <div className="working-cards  min-h-full">
              TEST CONTENT
            </div>
          </div>
        </div>

        <div className='working-wrapper basis-1/3'>
          <div className="ko-list flex-col basis-1/3 min-h-8/10">
            <div className="listWrapper border ">
`              <h2>Completed</h2>
`            </div>
          </div>
        </div>
 */