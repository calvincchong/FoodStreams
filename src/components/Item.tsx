import React from "react";
import { useState, useEffect, useRef } from "react";

const Item = ({ item }: { item: any }) => {
  return (
    <div className="">
      <label>
        <input type="checkbox" />
        <span className="right"> {item} </span>
      </label>
    </div>
  );
};

export default Item;
