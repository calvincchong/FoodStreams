import React from 'react';
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import initialData from '../../fixtures/Orders.js';
import Column from './Column.jsx';

const Board = ({props}) => {
  const [isConnected, setIsConnected] = useState(false);
  const state = initialData;

  useEffect(() => {
    const socket = io('http://localhost:9000'); // url of the server is used to create socket
    // when connected
    socket.on('connect', (res) => {
      setIsConnected('true');
    });

    socket.on('time', (time) => {
      setIsConnected(time);
    });

    // use await to fetch dots

    socket.on('disconnect', () => {
      setIsConnected('Disconnected from Server');
    });
  }, []);

  return (
    <div className="board-main-content flex flex-col">
      <div className="board-header">This is on top</div>
      <h2> Order Board</h2>
      <div>It is {isConnected} that we are connected.</div>

      <div className="board-canvas flex flex-row min-h-8/10">

        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const orders = column.orderIds.map(taskId => state.orders[taskId]);

          return <Column className='' key={column.id} column={column} orders={orders} />
        })};

      </div>

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