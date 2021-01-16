import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

// Producst
import ProductList from './components/screens/products/ProductList';
import AddProduct from './components/screens/products/AddProduct';
import UpdateProducts from './components/screens/products/UpdateProducts';
import ManageProducts from './components/screens/products/ManageProducts'

// Warehouse
import WarehouseList from './components/screens/warehouse/WarehouseList'
import AddWarehouse from './components/screens/warehouse/AddWarehouse';
import UpdateWarehouse from './components/screens/warehouse/UpdateWarehouse';
import WarehouseInfo from './components/screens/warehouse/WarehouseInfo';

// Cart
import Cart from './components/screens/cart/Cart';

// Auth
import Login from './components/screens/auth/Login';
import Register from './components/screens/auth/Register';

import Provider from './context/Provider'
import Navbar from './components/modules/navbar';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.routerRef = React.createRef();
  }

  render() {
    return (
      <Provider>
        <Router ref={this.routerRef}>
          <div className="App">

            <Navbar />

            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/add-warehouse" component={AddWarehouse} />
              <Route exact path="/products" component={ProductList} />
              <Route exact path="/myproducts" component={ManageProducts} />
              <Route exact path="/update-products/:id" component={UpdateProducts} />
              <Route exact path="/update-warehouse/:id" component={UpdateWarehouse} />
              <Route exact path="/warehouses" component={WarehouseList} />
              <Route exact path="/warehouses/:id" component={WarehouseInfo} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
