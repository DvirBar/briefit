import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="App">
        <Router />
      </div>
    </BrowserRouter>

  );
}

export default App;
