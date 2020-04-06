import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import HookApp from "./HookApp";

//implimentation with redux
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );

//implimentation with hooks
ReactDOM.render(<HookApp />, document.getElementById("root"));
