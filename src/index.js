import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  async function (response) {
    if (response.status === 202) {
      console.log("HTTP 202 received, polling operation...");

      while (response.data.status !== 200) {
        console.log(
          "Operation running at: /api/tasks/" + response.data.data.task_id
        );
        setTimeout(function () {
          axios.get("/api/tasks/" + response.data.data.task_id);
          console.log("Operation status is " + response.data.status);
        }, 5000);
      }

      if (response.data.status === "Failed") {
        // Treat failures as exceptions, so they can be handled as such
        throw "Operation failed!";
      } else {
        console.log("Operation succeeded!");
        // Once operation succeeded, return response from final resource location
        return await axios.get("/api/tasks/" + response.data.data.task_id);
      }
    }

    // If not a 202 response, then return as normal
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
