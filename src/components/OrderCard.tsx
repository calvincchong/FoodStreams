import React from "react";
import Item from "./Item";
import OCardHeader from "./OCardHeader";

const OrderCard = ({ order }: { order: any }) => {
  const { id, name, price, quantity } = order;

  console.log(order, "in ordercard");

  return (
    <>
      <OCardHeader summary={order} />
      <div className="flex flex-col mx-2 my-2">
        <h1> Order {id} </h1>
        <div className="p-2"> {order.name} </div>
        <div className="max-h-30 overflow-auto 5-5">
          {order.items.map((item: any, i: number) => (
            <Item key={i} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderCard;
