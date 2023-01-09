// Bring React in to build a component.
import React from "react";
// Import from react-dom the ability to create a root render
import { createRoot } from "react-dom/client";
// create the root of the app by selection where the app should be mounted in the dom
const root = createRoot(document.getElementById("root"));

// Here is out base App component.
// Notice we are NOT using jsx here. This is because we have not set up babel yet.
const App = React.createElement("h1",null,"Hello World");

// render the root element with the provided component
root.render(<App />);