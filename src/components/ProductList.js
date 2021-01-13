import React from "react";
import axios from 'axios';

import ProductItem from "./ProductItem";
import withContext from "../withContext";

const ProductList = props => {
  const { products, getProducts } = props.context;

  const [status, setStatus] = React.useState(null)

  const getProductsFc = async () => {
    setStatus('loading')
    await getProducts()
    setStatus(null)
  }

  React.useEffect(() => {
    getProductsFc()
  }, [])
  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Our Products</h4>
        </div>
      </div>
      <br />
      <div className="container">
        {status === 'loading' && (
          <a className="button is-loading ">Loading</a>
        )}
        {status !== 'loading' && (
          <div className="column columns is-multiline">
            {products && products.length ? (
              products.map((product, index) => (
                <ProductItem
                  product={product}
                  key={index}
                  addToCart={props.context.addToCart}
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
        )}
      </div>
    </>
  );
};

export default withContext(ProductList);
