import React from "react";
/**
 * Indicates whether the socket is connected or not.
 * Ideally should take in a connection and routinely check whether it is still connected.
 */

// current stateless component
const IsConnected = () => {
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          {/* <ExclamationTriangleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          /> */}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            It is true that we are connected.
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              Connection has been made with the kitchen display board. Below is
              the most recent transaction that are currently being worked on.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IsConnected;
