import React from "react";
import withContext from "../withContext";

import { Link } from "react-router-dom";


const ProductItemAdm = props => {
  const { product} = props;



  return (
    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src="https://bulma.io/images/placeholders/128x128.png"
                alt={product.shortDesc}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {product.name}{" "}
              <span className="tag is-primary">${product.price}</span>
            </b>
            <div>{product.shortDesc}</div>
            {product.stock > 0 ? (
              <small>{product.stock + " Available"}</small>
            ) : (
                <small className="has-text-danger">Out Of Stock</small>
              )}
            <div className="is-clearfix">



              <Link to={"/update-products/" + product.id} className="button  is-small is-outlined is-pulled-right button-mr">
                Editar
                    </Link>
                    <button
                className="button  is-small is-outlined is-pulled-right button-mr"
                onClick={() => 
                  props.removeProducts(product.id)
                }>
                Eliminar
              </button>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withContext(ProductItemAdm);