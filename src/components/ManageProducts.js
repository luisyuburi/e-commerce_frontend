import React from "react";

import ProductItemAdm from "./ProductItemadm";
import withContext from "../withContext";

const ManageProducts = props => {
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
          <h4 className="title">Mis Productos</h4>
        </div>
      </div>
      <br />
      <div className="container">
        {status === 'loading' && (
          <a className="button is-loading">Loading</a>
        )}
        {status !== 'loading' && (
          <div className="column columns is-multiline">
            {products && products.length ? (
              products.map((product, index) => (
                <ProductItemAdm
                  product={product}
                  key={index}
                  removeProducts={props.context.removeProducts}
                />
              ))
            ) : (
              <div className="column">
                <span className="title has-text-grey-light">
                  Aun no tienes productos
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default withContext(ManageProducts);
