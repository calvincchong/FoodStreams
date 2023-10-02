import React from "react";
import { useState, useEffect, useRef } from "react";

const Item = ({ item }: { item: any }) => {
  return (
    <div className="py-1 ">
      <label>
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-orange-600"
        />
        <span className="right"> #QTY {item} </span>
      </label>
    </div>
  );
};

export default Item;
