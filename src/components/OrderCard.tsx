import React from "react";
import Item from "./Item";
import OCardHeader from "./OCardHeader";
import OrderAccordion from "./OrderAccordion";

const OrderCard = ({ order }: { order: any }) => {
  const { id, name, price, quantity } = order;

  console.log(order, "in ordercard");

  const accordionStyle = (
    <OrderAccordion title={"0/4"}>
      <div className="max-h-30 overflow-auto 5-5">
        {order.items.map((item: any, i: number) => (
          <Item key={i} item={item} />
        ))}
      </div>
    </OrderAccordion>
  );

  const noAccordion = (
    <div className="max-h-30 overflow-auto 5-5">
      {order.items.map((item: any, i: number) => (
        <Item key={i} item={item} />
      ))}
    </div>
  );

  return (
    <>
      <OCardHeader summary={order} />
      <div className="flex flex-col mx-2 my-2">
        {/* <h1> Order {id} </h1>
        <div className="p-2"> {order.name} </div> */}
        <div className="max-h-30 overflow-auto 5-5">
          {order.items.map((item: any, i: number) => (
            <Item key={i} item={item} />
          ))}
        </div>
        {accordionStyle}
      </div>
    </>
  );
};

export default OrderCard;
