import React, { Component } from "react";
import withContext from "../../../context/withContext";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import ProductItem from '../../commons/ProductItem';

class WarehouseInfo extends Component {
  id = this.props.match.params.id;
  constructor(props) {
    super(props);
    this.state = {
      warehouse: undefined,
      status: null,
      attachLoading: null,
      showForm: false,
      products: null
    }
  }

  componentDidMount() {
    this.getWarehouse()
  }

  getWarehouse = async () => {
    this.setState({ status: "loading" })
    const warehouseResponse = await axios.get(
      'https://vast-reef-79531.herokuapp.com//api/warehouses/' + this.id
    )
    this.setState({
      status: null,
      warehouse: warehouseResponse.data.data
    }, () => {
      this.getProducts()
    })


  }

  getProducts = async () => {
    await this.props.context.getProducts()
    const allProducts = this.props.context.products
    const warehouseProducts = this.state.warehouse.products

    let products = allProducts;

    if (allProducts.length > 0 && warehouseProducts.length > 0) {
      products = allProducts.filter((product) => {
        return !warehouseProducts.find((warehouseproduct) => {
          return warehouseproduct.id === product.id
        })
      })
    }

    this.setState({ products })
  }

  detach = async (product) => {
    const productDetach = await axios.post(
      'https://vast-reef-79531.herokuapp.com//api/warehouses/detach',
      { warehouseid: this.id, productid: product.id }
    )

    if (productDetach.status === 200) {
      await this.getWarehouse()
    }
  }

  submit = async (e) => {
    this.setState({ attachLoading: true })
    e.preventDefault()
    let productid = e.target.elements["productid"].value

    const warehouseAttachResponse = await axios.post(
      'https://vast-reef-79531.herokuapp.com//api/warehouses/attach',
      { warehouseid: this.id, productid }
    )

    if (warehouseAttachResponse.status === 200) {
      this.setState({ attachLoading: null })
      await this.getWarehouse()
    }
  }


  render() {



    const { user } = this.props.context;

    return user === null ? (
      <Redirect to="/" />
    ) : (
        <>
          {this.state.warehouse && (
            <React.Fragment>
              <div className="hero is-primary">
                <div className="hero-body container ">
                  <p className="title">
                    {this.state.warehouse.name}
                  </p>

                  <h1 className="subtitle">
                    <strong>
                      {this.state.warehouse.location}
                    </strong>

                  </h1>
                </div>
              </div>

              <div className="add-warehouse-container">
                <button
                  className="button is-success righ add-warehouse"
                  onClick={() => this.setState({ showForm: true })

                  }
                >
                  Agregar producto
                </button>
              </div>

              {this.state.showForm && (
                <React.Fragment>

                  <div className=" add-product product-list-container">
                    {this.state.products && this.state.products.length > 0 && (

                      <form onSubmit={this.submit}>
                        {this.state.attachLoading === true && (
                          <span className="button is-loading">Loading</span>
                        )}

                        <select required name="productid" defaultValue="">
                          <option value="" disabled >Seleccione</option>
                          {this.state.products.map((product) => (

                            <option key={product.id}
                              value={product.id}>{product.name}</option>
                          ))}

                        </select>
                        <button className="add-button" type="submit">Agregar</button>
                      </form>
                    )}
                    {(!this.state.products || this.state.products.length === 0) && (
                      <span>No hay productos para agregar</span>
                    )}


                  </div>
                </React.Fragment>
              )}
              <div className="product-list-container">
                {this.state.warehouse.products && this.state.warehouse.products.length ? (
                  this.state.warehouse.products.map((product, index) => (
                    <ProductItem
                      product={product}
                      key={index}
                      onDetach={this.detach}
                    />
                  ))
                ) : (
                    <div className="column">
                      <span className="title has-text-grey-light">
                        No products found!
                </span>
                    </div>
                  )}
              </div>
              <br />
              <br />
              {this.state.status === "loading" && (
                <span className="button is-loading ">Loading</span>

              )}


            </React.Fragment>
          )}
        </>

      );

  }
}

export default withContext(WarehouseInfo);
