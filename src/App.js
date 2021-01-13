import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import axios from 'axios';

import AddProduct from './components/AddProduct';
import addWarehouse from './components/AddWarehouse';
import Cart from './components/Cart';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Register from './components/Register';
import ManageProducts from './components/ManageProducts'
import UpdateProducts from './components/UpdateProducts';
import WarehouseList from './components/WarehouseList'
import UpdateWarehouse from './components/UpdateWarehouse';


import Navbar from './components/modules/navbar';

import Context from "./Context";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      cart: {},
      products: [],
      warehouse: []
    };
    this.routerRef = React.createRef();
  }


  async componentDidMount() {
    this.getProducts()

    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");

    user = user ? JSON.parse(user) : null;
    cart = cart ? JSON.parse(cart) : {};


    this.setState({ user, cart });
  }

  getWarehouses = async () => {
    const warehouses = await axios.get('http://localhost:8000/api/warehouses');
    this.setState({ warehouses: warehouses.data.data });
  }



  getProducts = async () => {
    const products = await axios.get('http://127.0.0.1:8000/api/products');

    this.setState({ products: products.data.data });
  }

  removeProducts = async (id, callback) => {

    var bool = window.confirm("¿Seguro que dese eliminar el producto?");
    if (bool) {

      const deleteResponse = await axios.delete('http://127.0.0.1:8000/api/products/' + id)

      if (deleteResponse.status === 200) {

        const products = this.state.products;
        const filterproducts = products.filter(products => products.id !== id)

        this.setState({ products: filterproducts }, () => callback && callback());
        alert("Producto eliminado exitosamente");
      }
    }
  }

  removeWarehouse = async (id, callback) => {
    console.log(id)

    var bool = window.confirm("¿Seguro que dese eliminar la Bodega?");
    if (bool) {

      const deleteResponse = await axios.delete('http://127.0.0.1:8000/api/warehouses/' + id)

      if (deleteResponse.status === 200) {

        const warehouses = this.state.warehouses;
        const filterwarehouses = warehouses.filter(warehouses => warehouses.id !== id)

        this.setState({ warehouses: filterwarehouses }, () => callback && callback());
        alert("Bodega eliminada exitosamente");
      }
    }
  }

  UpdateProducts = (id, product, callback) => {
    let products;
    if (this.state.products.length) {
      products = this.state.products.slice()
    } else {
      products = []
    };
    products.push(product);
    this.setState({ products }, () => callback && callback());
  }


  UpdateWarehouse = (id, warehouse, callback) => {
    let warehouses;
    if (this.state.warehouses.length) {
      warehouses = this.state.warehouses.slice()
    } else {
      warehouses = []
    };
    warehouses.push(warehouse);
    this.setState({ warehouses }, () => callback && callback());
  }



  addProduct = (product, callback) => {
    let products;
    if (this.state.products.length) {
      products = this.state.products.slice()
    } else {
      products = []
    };
    products.push(product);
    this.setState({ products }, () => callback && callback());

  };

  addWarehouse = (warehouse, callback) => {
    let warehouses;
    if (this.state.warehouse.length) {
      warehouses = this.state.warehouses.slice()
    } else {
      warehouses = []
    };
    warehouses.push(warehouse);
    this.setState({ warehouses }, () => callback && callback());

  };

  Register = async (name, email, password, c_password) => {
    const res = await axios.post(
      'http://localhost:8000/api/register',
      { name, email, password, c_password },
    ).catch((res) => {
      return { status: 401, message: 'Unauthorized' }
    })

    if (res.status === 200) {
      const user = res.data.data;

      this.setState({ user });
    }
  }


  login = async (email, password) => {
    const res = await axios.post(
      'http://127.0.0.1:8000/api/login',
      { email, password },
    ).catch((res) => {
      return { status: 401, message: 'Unauthorized' }
    })

    if (res.status === 200) {

      const user = res.data.data;

      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }


  addToCart = cartItem => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    // if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
    //   cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    // }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };



  removeFromCart = cartItemId => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };



  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          logout: this.logout,
          Register: this.Register,
          addProduct: this.addProduct,
          addWarehouse: this.addWarehouse,
          clearCart: this.clearCart,
          getProducts: this.getProducts,
          getWarehouses: this.getWarehouses,
          removeProducts: this.removeProducts,
          UpdateProducts: this.UpdateProducts,
          UpdateWarehouse: this.UpdateWarehouse,
          removeWarehouse: this.removeWarehouse,
          checkout: this.checkout
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App">

            <Navbar />

            <Switch>
              <Route exact path="/" component={ProductList} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/add-warehouse" component={addWarehouse} />
              <Route exact path="/products" component={ProductList} />
              <Route exact path="/myproducts" component={ManageProducts} />
              <Route exact path="/update-products/:id" component={UpdateProducts} />
              <Route exact path="/update-warehouse/:id" component={UpdateWarehouse} />
              <Route exact path="/warehouses" component={WarehouseList} />



            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
