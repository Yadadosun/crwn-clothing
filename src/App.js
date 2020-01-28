import React from "react";
import HomePage from "../src/pages/homepage/homepage";
import { Switch, Route } from "react-router-dom";
import "./App.css";

const HatsPage = () => {
  return <div>Hi, HATS!</div>;
};

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop/hats" component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
