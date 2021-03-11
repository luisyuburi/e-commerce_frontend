import React, { Component } from 'react'
import axios from 'axios'

import Context from './Context'

class Provider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: undefined,
      cart: {},
      products: [],
      warehouse: [],
    }
  }

  async componentDidMount() {
    this.getProducts()

    let user = localStorage.getItem('user')
    let cart = localStorage.getItem('cart')

    user = user ? JSON.parse(user) : null
    cart = cart ? JSON.parse(cart) : {}

    this.setState({ user, cart })
  }

  getWarehouses = async () => {
    const warehouses = await axios.get(
      'https://vast-reef-79531.herokuapp.com/api/warehouses',
    )
    this.setState({ warehouses: warehouses.data.data })
  }

  getProducts = async () => {
    const products = await axios.get(
      'https://vast-reef-79531.herokuapp.com/api/products',
    )

    this.setState({ products: products.data.data })
  }

  removeProducts = async (product, callback) => {
    const id = product.id

    const bool = window.confirm('¿Seguro que dese eliminar el producto?')
    if (bool) {
      const deleteResponse = await axios.delete(
        'https://vast-reef-79531.herokuapp.com/api/products/' + id,
      )

      if (deleteResponse.status === 200) {
        const products = this.state.products
        const filterproducts = products.filter((products) => products.id !== id)

        this.setState(
          { products: filterproducts },
          () => callback && callback(),
        )
        alert('Producto eliminado exitosamente')
      }
    }
  }

  removeWarehouse = async (id, callback) => {
    var bool = window.confirm('¿Seguro que dese eliminar la Bodega?')
    if (bool) {
      const deleteResponse = await axios.delete(
        'https://vast-reef-79531.herokuapp.com/api/warehouses/' + id,
      )

      if (deleteResponse.status === 200) {
        const warehouses = this.state.warehouses
        const filterwarehouses = warehouses.filter(
          (warehouses) => warehouses.id !== id,
        )

        this.setState(
          { warehouses: filterwarehouses },
          () => callback && callback(),
        )
        alert('Bodega eliminada exitosamente')
      }
    }
  }

  UpdateProducts = (id, product, callback) => {
    let products
    if (this.state.products.length) {
      products = this.state.products.slice()
    } else {
      products = []
    }
    products.push(product)
    this.setState({ products }, () => callback && callback())
  }

  UpdateWarehouse = (id, warehouse, callback) => {
    let warehouses
    if (this.state.warehouses.length) {
      warehouses = this.state.warehouses.slice()
    } else {
      warehouses = []
    }
    warehouses.push(warehouse)
    this.setState({ warehouses }, () => callback && callback())
  }

  addProduct = (product, callback) => {
    let products
    if (this.state.products.length) {
      products = this.state.products.slice()
    } else {
      products = []
    }
    products.push(product)
    this.setState({ products }, () => callback && callback())
  }

  addWarehouse = (warehouse, callback) => {
    let warehouses
    if (this.state.warehouse.length) {
      warehouses = this.state.warehouses.slice()
    } else {
      warehouses = []
    }
    warehouses.push(warehouse)
    this.setState({ warehouses }, () => callback && callback())
  }

  Register = async (name, email, password, c_password) => {
    const res = await axios
      .post('https://vast-reef-79531.herokuapp.com/api/register', {
        name,
        email,
        password,
        c_password,
      })
      .catch((res) => {
        return { status: 401, message: 'Unauthorized' }
      })

    if (res.status === 200) {
      const user = res.data.data

      this.setState({ user })
    }
  }

  login = async (email, password) => {
    const res = await axios
      .post('https://vast-reef-79531.herokuapp.com/api/login', {
        email,
        password,
      })
      .catch((res) => {
        return { status: 401, message: 'Unauthorized' }
      })

    if (res.status === 200) {
      const user = res.data.data

      this.setState({ user })
      localStorage.setItem('user', JSON.stringify(user))
      return true
    } else {
      return false
    }
  }

  addToCart = (item) => {
    let cart = this.state.cart

    let itemCart = cart[item.id]

    if (itemCart) {
      if (item.stock > itemCart.amount) {
        itemCart.amount = parseInt(itemCart.amount) + 1
      } else {
        window.alert('No stock')
        itemCart.amount = parseInt(item.stock)
      }
    } else {
      cart[item.id] = item
      cart[item.id].amount = 1
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    this.setState({ cart })
  }

  removeFromCart = (cartItemId) => {
    let cart = this.state.cart
    delete cart[cartItemId]
    localStorage.setItem('cart', JSON.stringify(cart))
    this.setState({ cart })
  }

  clearCart = () => {
    let cart = {}
    localStorage.removeItem('cart')
    this.setState({ cart })
  }

  logout = (e) => {
    e.preventDefault()
    this.setState({ user: null })
    localStorage.removeItem('user')
  }

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
          checkout: this.checkout,
        }}
      >
        {this.props.children}
      </Context.Provider>
    )
  }
}

export default Provider
