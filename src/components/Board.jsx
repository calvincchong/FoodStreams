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

    const start = data.columns[source.droppableId];
    const end = data.columns[destination.droppableId]; // store reference to column that we finish in.
    // if start column and finish column are the same then we con continue to use the same logic that we used before.
      // console.log('finding the column in the data', column);

    if (start === end) {
      const newOrderIds = Array.from(start.orderIds);
        // console.log('this is new OrderIds from new array using array From', newOrderIds);
      newOrderIds.splice(source.index, 1);
        // console.log('after splice', newOrderIds);
      newOrderIds.splice(destination.index, 0, draggableId);

        // console.log('this is new orderIds after slicing', newOrderIds)
      const newColumn = {
        ...start,
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
      return;
    }

    const startOrderIds = Array.from(start.orderIds);
    startOrderIds.splice(source.index, 1) // remove draggedstartId from array
    const newStart = {
      ...start,
      orderIds: startOrderIds
    }

    const endOrderIds = Array.from(end.orderIds);
    endOrderIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...end,
      orderIds: endOrderIds
    }

    const newDataState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd
      }
    }

    console.log('this is the new state', newDataState);

    setData(newDataState);
    return;

  };

  return (
    <div className="board-main-content flex flex-col min-h-8/10">
      <div className="board-header">This is on top</div>
      <h2> Order Board</h2>
      <div>It is {isConnected} that we are connected.</div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="AllColumns board-canvas flex flex-row min-h-8/10">

          {data.columnOrder.map((columnId, index) => {
            const column = data.columns[columnId];
            const orders = column.orderIds.map(taskId => data.orders[taskId]);

            return <Column key={column.id} column={column} orders={orders} index={index}/>
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