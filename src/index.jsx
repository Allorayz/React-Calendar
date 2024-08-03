import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

/* components */
import App from "./App";
import { initAxios } from "./utils/initAxios";
/* components */

initAxios();

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
