import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//ui
import "./modules/Auth/css/authStyles.css";
import "./modules/Global/css/globalStyles.css";
import "./modules/Profile/css/profileStyles.css";
import "./modules/Task/css/selectCategory.css";
//Redux
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
