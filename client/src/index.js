import "materialize-css/dist/css/materialize.min.css";

import React from "react";
import reduxThunk from "redux-thunk";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import App from "./components/App";
import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

console.log("Stripe Key is", process.env.REACT_APP_STRIPE_KEY);
console.log("Enviornment is ", process.env.NODE_ENV);
