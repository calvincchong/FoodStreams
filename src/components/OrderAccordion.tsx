import React, { ReactElement } from "react";
import { Disclosure, Transition } from "@headlessui/react";

const OrderAccordion = ({
  children,
  title,
}: {
  children: ReactElement;
  title: string;
}) => {
  return (
    <div className="w-full">
      {/* <h1>Order Accordion</h1> */}
      <Disclosure>
        {({ open }) => (
          /* Use the `open` state to conditionally change the direction of an icon. */
          <>
            <Disclosure.Button className="bg-gray-200 hover:bg-blue-700">
              {title}: items
              {/* Do you offer technical support? */}
              {/* <ChevronRightIcon className={open ? "rotate-90 transform" : ""} /> */}
              {/* <ChevronRightIcon className={open ? "rotate-90 transform" : ""} /> */}
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel>{children}</Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default OrderAccordion;
