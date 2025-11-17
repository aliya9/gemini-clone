import React from "react";
import Sidebar from "./components/sidebar/sidebar";
import Main from "./components/main/main";
import ContextProvider from "./context/context";
import "./App.css";

const App = () => {
  return (
    <ContextProvider>
      <div className="App">
        <Sidebar/>
        <Main/>
      </div>
    </ContextProvider>
  );
}

export default App;