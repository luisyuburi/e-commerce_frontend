import React, { Component } from "react";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";
import axios from 'axios';

import ProductItemAdm from "./ProductItemadm";






class UpdateProducts extends Component {
  id = this.props.match.params.id;
  constructor(props) {
    super(props);
    this.state = {
      product: undefined,
      status: null
    }
  }

  componentDidMount() {
    this.getProduct()
  }

  getProduct = async () => {
    this.setState({ status: "loading" })
    const productResponse = await axios.get(
      'http://localhost:8000/api/products/' + this.id
    )
    this.setState({
      status: null,
      product: productResponse.data.data
    })
    console.log(productResponse);
  }

  save = async (e) => {
    e.preventDefault();
    const { name, price, stock, shortDesc, description } = this.state.product;
    console.log(name, price);
    if (name && price) {

      await axios.patch(
        'http://localhost:8000/api/products/' + this.id,
        { id: this.id, name, price, stock, shortDesc, description },
      )

      this.props.context.UpdateProducts(
        {
          name,
          price,
          shortDesc,
          description,
          stock: stock || 0
        },
        () => {}
      );
      this.setState(
        { flash: { status: 'is-success', msg: 'Product updated successfully' } }
      );

    } else {
      this.setState(
        { flash: { status: 'is-danger', msg: 'Please enter name and price' } }
      );
    }
  };

  handleChange = e => {
    const product = this.state.product;

    product[e.target.name] = e.target.value
    this.setState({ product });
  }

  render() {
 

    const { user } = this.props.context;
    return user === null ? (
      <Redirect to="/" />
    ) : (
        <>
          <div className="hero is-primary ">
            <div className="hero-body container">
              <h4 className="title">Update Product</h4>
            </div>
          </div>
          <br />
          <br />
          {this.state.status === "loading" && (
            <a className="button is-loading ">Loading</a>

          )}
          {this.state.product && (

            <form onSubmit={this.save}>
              <div className="columns is-mobile is-centered">
                <div className="column is-one-third">
                  <div className="field">
                    <label className="label">Product Name: </label>
                    <input
                      className="input"
                      type="text"
                      name="name"
                      defaultValue={this.state.product.name}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="field">
                    <label className="label">Price: </label>
                    <input
                      className="input"
                      type="number"
                      name="price"
                      defaultValue={this.state.product.price}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="field">
                    <label className="label">Available in Stock: </label>
                    <input
                      className="input"
                      type="number"
                      name="stock"
                      defaultValue={this.state.product.stock}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Short Description: </label>
                    <input
                      className="input"
                      type="text"
                      name="shortDesc"
                      defaultValue={this.state.product.shortDesc}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Description: </label>
                    <textarea
                      className="textarea"
                      type="text"
                      rows="2"
                      style={{ resize: "none" }}
                      name="description"
                      defaultValue={this.state.product.description}
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.flash && (
                    <div className={`notification ${this.state.flash.status}`}>
                      {this.state.flash.msg}
                    </div>
                  )}
                  <div className="field is-clearfix">
                    <button
                      className="button is-primary is-outlined is-pulled-right"
                      type="submit"
                      onClick={this.save}
                    >
                      Update
                </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </>
      );
  }
}

export default withContext(UpdateProducts);
