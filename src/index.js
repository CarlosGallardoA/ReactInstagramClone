import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseContext from "./context/firebase";
import { firebase, FildValue } from "./lib/firebase";
import "./styles/app.css";
ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, FildValue }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
