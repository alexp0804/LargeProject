import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { App, Register } from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Register />
  </StrictMode>,
  rootElement
);
