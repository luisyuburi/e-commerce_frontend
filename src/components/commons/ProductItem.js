import React from "react";

const ProductItem = props => {
  const { product } = props;


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
              <span className="tag is-primary">$COP {product.price}</span>
            </b>
            <div>{product.shortDesc}</div>
            {product.warehouse && product.warehouse.length > 0 &&(
              <React.Fragment>

                <span>En las bodegas: </span>

                {product.warehouse.map((warehouse) => (
                  <span key={warehouse.id} className="tag is-primary">{warehouse.name}</span>
                ))}
              </React.Fragment>

            )}
            <div>
              {product.stock > 0 ? (
                <small>{product.stock + " Disponibles"}</small>
              ) : (
                  <small className="has-text-danger">Out Of Stock</small>
                )}

            </div>
            <div className="is-clearfix">

              {props.addToCart && (
                <button
                  className="button is-small is-outlined is-primary   is-pulled-right button-mr"
                  onClick={() => props.addToCart(product)}
                >
                  Agregar al carrito
                </button>
              )}

              {props.onDelete && (
                <button
                  className="button is-small is-outlined is-primary   is-pulled-right button-mr"
                  onClick={() => props.onDelete(product)
                  }
                >
                  Eliminar
                </button>
              )}

              {props.onEdit && (
                <button
                  className="button is-small is-outlined is-primary   is-pulled-right button-mr"
                  onClick={() => props.onEdit(product)
                  }
                >
                  Editar
                </button>
              )}

              {props.onDetach && (
                <button
                  className="button is-small is-outlined is-primary   is-pulled-right button-mr"
                  onClick={() => props.onDetach(product)
                  }
                >
                  Detach
                </button>
              )}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;