import React from "react";

import { Link } from "react-router-dom";


const WarehouseItem = props => {
  const { warehouse } = props;
  return (

    <div className=" column is-half">
      <div className="box">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img
                src="https://bulma.io/images/placeholders/128x128.png"
                alt={warehouse.shortDesc}
              />
            </figure>
          </div>
          <div className="media-content">
            <b style={{ textTransform: "capitalize" }}>
              {warehouse.name}{" "}
              <span className="tag is-primary"> {warehouse.location}</span>
            </b>
            <div>{warehouse.shortDesc}</div>
            {warehouse.location}{" "}
            <div className="is-clearfix">

              <Link to={"/warehouses/" + warehouse.id} className="button  is-small is-outlined is-pulled-right button-mr">
                Detalles
              </Link>

              <Link to={"/update-warehouse/" + warehouse.id} className="button  is-small is-outlined is-pulled-right button-mr">
                Editar
              </Link>
              <button
                className="button  is-small is-outlined is-pulled-right button-mr"
                onClick={() =>
                  props.removeWarehouse(warehouse.id)
                }
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};


export default WarehouseItem;