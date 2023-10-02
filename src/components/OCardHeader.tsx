import React, { ReactComponentElement, ReactDOM, ReactNode } from "react";
import { useMemo, useEffect, useState } from "react";
import OrderTypeBadge from "./Badges/OrderTypeBadge";
//A header component that's split into three sections.
// Maybe there's a way to do discriminate union
// write banner component inside the order card that is split into three sections with each section being a component that is provided as parameters in the function

enum OrderType {
  delivery = "delivery",
  pickup = "pickup",
  sitdown = "sitdown",
}

function getRandomEnumValue<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.values(anEnum) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

const OCardHeader = ({ summary }: { summary: any }) => {
  console.log(summary.id, summary.name);
  console.log(summary, summary.summary);
  const [cacheDelType, setCacheDelType] = useState<OrderType>(
    OrderType.delivery
  );

  useEffect(() => {
    setCacheDelType(getRandomEnumValue(OrderType));
  }, []);
  // const cacheDelType = useMemo(
  //   () => getRandomEnumValue(OrderType),
  //   []
  // );

  return (
    <div className="bg-orange-200 text-slate-800 flex flex-row justify-between w-full p-3">
      {/* <div className="flex justify-items-stretch w-full mx-0 my-0"> */}
      <div className="text-lg font-medium">{summary.id}</div>
      <div className="underline">{summary.name}</div>
      <div className="flex flex-row space-x-2">
        <OrderTypeBadge type={cacheDelType} />
        <img
          className=" h-6 w-6 rounded-full ml-2"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

export default OCardHeader;
