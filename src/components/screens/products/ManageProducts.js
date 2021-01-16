import React from "react";
import { Link } from "react-router-dom";

import ProductItem from "../../commons/ProductItem";
import withContext from "../../../context/withContext";

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
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <div className="columns is-mobile is-multiline is-centered">
            <h4 className="title">Mis Productos</h4>
          </div>
        </div>
      </div>

      <div className="add-product-container container">
        <Link to="/add-product" className="button is-success add-product">
          Agregar producto
        </Link>
      </div>

      <br />
      <div className="container">
        {status === 'loading' && (
          <span className="button is-loading">Loading</span>
        )}
        {status !== 'loading' && (
          <div className="column columns is-multiline">
            {products && products.length ? (
              products.map((product, index) => (
                <ProductItem
                  product={product}
                  key={index}
                  onDelete={props.context.removeProducts}
                  onEdit={(product) => props.history.push("/update-products/" + product.id)}
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
