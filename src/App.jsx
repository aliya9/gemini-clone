import React from "react";
import Sidebar from "./components/sidebar/sidebar";
import Main from "./components/main/main";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Sidebar/>
      <Main/>
    </div>
  );
}

export default App;