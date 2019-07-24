import React from "react";
import { Route, Switch } from "react-router-dom";

import ProductIndex from "./products/ProductIndex"

const App = () => {
  return (
    <div>
      <h1>Online Store</h1>
        <Route exact path="/" component={ProductIndex} />
    </div>
  );
};

export default App;