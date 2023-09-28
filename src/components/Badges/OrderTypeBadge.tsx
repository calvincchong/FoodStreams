import React from "react";

const colorMatch = {
  delivery: "bg-red-500",
  pickup: "bg-green-500",
  sitdown: "bg-blue-500",
};

enum OrderType {
  delivery = "delivery",
  pickup = "pickup",
  sitdown = "sitdown",
}

const OrderTypeBadge = ({ type }: { type: OrderType }) => {
  return (
    <div>
      <span
        className={`px-2 py-1 deliveryType inline-flex text-xs leading-5 font-semibold rounded-full ${colorMatch[type]} text-white`}
      >
        {type}
      </span>
    </div>
  );
};

export default OrderTypeBadge;
