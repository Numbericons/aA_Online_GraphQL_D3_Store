import React from "react";
import { Route, Switch } from "react-router-dom";

import AuthRoute from '../util/route_util';
import ProductIndex from "./products/ProductIndex"
import Login from "./session/login";
import Register from "./session/register"
import Nav from "./Nav";
import ProductDetail from "./products/ProductDetail";
import CreateProduct from './products/CreateProduct';

const App = (props) => {
  return (
    <div>
      <Route path="/" component={Nav} />
      <h1>Online Store</h1>
      <Switch>
        <Route exact path="/product/:productId" component={ProductDetail} />
        <AuthRoute exact path="/new-product" component={CreateProduct} />
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
        <Route path="/" component={ProductIndex} />
      </Switch>
    </div>
  );
};

export default App;