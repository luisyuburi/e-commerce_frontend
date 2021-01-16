import React from "react";

import ProductItem from "../../commons/ProductItem";
import withContext from "../../../context/withContext";

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
    // eslint-disable-next-line
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
          <span className="button is-loading ">Loading</span>
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
