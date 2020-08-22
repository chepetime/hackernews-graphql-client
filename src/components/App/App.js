import React from "react";
import { Switch } from "react-router-dom";
import "./App.css";

import Header from "components/Header/Header";
import Routes from "components/Routes/Routes";

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Routes />
        </Switch>
      </div>
    </div>
  );
}

export default App;
