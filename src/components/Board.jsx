import React from "react";
import { useState, useEffect, useRef } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import io from "socket.io-client";
import axios from "axios";
import initialData from "../../fixtures/Orders.js";
import Column from "./Column.jsx";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddOrderForm from "./AddOrderForm.jsx";

// import successGif from '../../fixtures/assets/1_1VZUa3mn3569l3ePzq3piA.gif';
var socket = io("http://localhost:9000");

const Board = ({ username }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState(initialData);
  const [isAnimate, setIsAnimate] = useState(false);
  const [dbOrders, setDbOrders] = useState("");
  const [dbColumns, setDbColumns] = useState("");
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // url of the server is used to create socket
    // when connected
    socket.on("connect", (res) => {
      setIsConnected("true");

      socket.emit("getAllOrders", {});
      socket.emit("getColumns", {});
    });

    socket.on("time", (time) => {
      setIsConnected(time);
    });

    // use await to fetch dots

    socket.on("disconnect", () => {
      setIsConnected("Disconnected from Server");
    });

    socket.on("allData", (result) => {
      const obj = {};

      result.forEach((order) => {
        obj[order.id] = order;
      });
      setDbOrders(obj);
    });

    // attempt asynchronous code ?
    socket.on("allColumns", (result) => {
      // const obj = Object.assign({}, result);
      const obj = {};

      result.forEach((column) => {
        obj[column.id] = column;
      });
      setDbColumns(obj);
    });
  }, []);

  useEffect(() => {}, [dbOrders, dbColumns]);

  const onDragEnd2 = (result) => {
    // console.log(result);
    const { destination, source, draggableId } = result;

    // do nothing if it is not within bounds of a working droppable.
    if (!destination) {
      return;
    }

    // do nothing if it is moved to the same place.
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("card hasnt moved");
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
        orderIds: newOrderIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      console.log("this is the new State", newState);

      setData(newState);
      return;
    }

    const startOrderIds = Array.from(start.orderIds);
    startOrderIds.splice(source.index, 1); // remove draggedstartId from array
    const newStart = {
      ...start,
      orderIds: startOrderIds,
    };

    const endOrderIds = Array.from(end.orderIds);
    endOrderIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...end,
      orderIds: endOrderIds,
    };

    const newDataState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd,
      },
    };

    console.log("this is the new state", newDataState);

    setData(newDataState);
    setIsAnimate(true);
    setTimeout(() => {
      if (isAnimate) {
        setIsAnimate(false);
      }
    }, 2000);
    return;
  };

  const onDragEnd = (result) => {
    // console.log(result);
    const { destination, source, draggableId } = result;
    // console.log('what is the destination', destination);  console.log('source', source); console.log('draggableId', draggableId); console.log('these are dbcolumns', dbColumns)

    const startColumn = dbColumns[source.droppableId];
    const endColumn = dbColumns[destination.droppableId]; // store reference to column that we finish in.
    const startIndex = source.index;
    const endIndex = destination.index;

    if (startColumn === endColumn) {
      //TODO: change positions
      const reOrderedColumn = startColumn.orderids.slice();
      reOrderedColumn.splice(startIndex, 1);
      // console.log('after splice', newOrderIds);
      reOrderedColumn.splice(destination.index, 0, draggableId);

      // change order
      socket.emit("changeOrder", {
        columnId: endColumn.id,
        reOrderedColumn: reOrderedColumn,
      });

      return;
    }

    if (startColumn != endColumn) {
      const reOrderedStartColumn = startColumn.orderids.slice();
      const reOrderedEndColumn = endColumn.orderids.slice();

      reOrderedStartColumn.splice(startIndex, 1);
      reOrderedEndColumn.splice(endIndex, 0, draggableId);

      console.log(reOrderedEndColumn);

      socket.emit("draggedToNewColumn", {
        startColumnId: startColumn.id,
        endColumnId: endColumn.id,
        reOrderedStartColumn: reOrderedStartColumn,
        reOrderedEndColumn: reOrderedEndColumn,
      });

      setIsAnimate(true);
      setTimeout(() => {
        if (isAnimate) {
          setIsAnimate(false);
        }
      }, 2000);
    }
  };

  const submitOrder = (orderDetails) => {
    console.log("client now sending order to socket", orderDetails);
    socket.emit("newOrder", orderDetails);
  };

  const images = [
    "https://media0.giphy.com/media/DyQrKMpqkAhNHZ1iWe/200w.webp?cid=ecf05e47y6e00hdcxnwnwrb2i102ho0ehhqrpk81ottd9rwu&rid=200w.webp&ct=g",
    "https://media1.giphy.com/media/RJzv5gG13bFsER317k/giphy.gif?cid=ecf05e470qguipp3vg6v0b211tc12vn8zlltauz8zuhyr4yp&rid=giphy.gif&ct=g",
    "https://media4.giphy.com/media/lgcUUCXgC8mEo/giphy.gif?cid=ecf05e470tw4xirzby1awx7b2hxxb31kqgpaajx53iincnxo&rid=giphy.gif&ct=g",
    "https://media2.giphy.com/media/7kn27lnYSAE9O/giphy.gif?cid=ecf05e47kx3hfb1c5611mj3w77y2f4nlpr634x7wa235lm33&rid=giphy.gif&ct=g",
  ];

  let successImage = images[Math.floor(Math.random() * 3)];

  let animation = isAnimate ? (
    <div
      className="fixed flex z-30 flex-col items-center space-x-2 justify-center bg-black/50 backdrop-blur-sm w-full h-full left-0 top-0 text-neutral-800"
      onClick={() => {
        setIsAnimate(false);
      }}
    >
      <div>
        <img src={`${successImage}`} />
      </div>
    </div>
  ) : (
    <></>
  );

  let orderForm = showForm ? (
    <AddOrderForm setShowForm={setShowForm} submitOrder={submitOrder} />
  ) : (
    <></>
  );

  return (
    <>
      {dbColumns && dbOrders && (
        <div className="board-main-content flex flex-col min-h-8/10 bg-slate-600">
          <Button onClick={() => {}}>Order Board</Button>
          <div>It is {isConnected} that we are connected.</div>
          <Button
            onClick={() => {
              setShowForm(true);
            }}
          >
            Add Order
          </Button>
          {orderForm}
          {animation}
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="AllColumns board-canvas flex flex-row min-h-8/10">
              {data.columnOrder.map((columnId, index) => {
                // console.log('what is columnId', columnId, dbColumns);
                console.log("how does dbOrders look", columnId, dbOrders);
                // const column = data.columns[columnId];
                const column = dbColumns[columnId];
                const orders = column.orderids.reduce((results, taskId) => {
                  taskId = taskId.toString();
                  if (dbOrders[taskId]) {
                    results.push(dbOrders[taskId]);
                  }
                  return results;
                }, []);
                return (
                  <Column
                    key={column.id}
                    column={column}
                    orders={orders}
                    index={index}
                  />
                );
              })}
            </div>
          </DragDropContext>
        </div>
      )}
    </>
  );
};

export default Board;
