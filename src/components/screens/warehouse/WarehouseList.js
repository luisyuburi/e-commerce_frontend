import React from "react";
import { Link } from "react-router-dom";


import WarehouseItem from "../../commons/WarehouseItem";
import withContext from "../../../context/withContext";

const WarehouseList = props => {
  const { warehouses, getWarehouses } = props.context;

  const [status, setStatus] = React.useState(null)

  const getWarehousesFc = async () => {
    setStatus('loading')
    await getWarehouses()
    setStatus(null)
  }


  React.useEffect(() => {
    getWarehousesFc()
    // eslint-disable-next-line
  }, [])
  return (

    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <div className="columns is-mobile is-multiline is-centered">

            <h4 className="title">Bodegas</h4>
          </div>
        </div>
      </div>
      <div className="add-warehouse-container">
        <Link to="/add-warehouse" className="button is-success righ add-warehouse">
          Agregar bodega
        </Link>
      </div>


      <br />
      <div className="container warehouse-item">
        {status === 'loading' && (
          <span className="button is-loading ">Loading</span>
        )}
        {status !== 'loading' && (
          <div className="column columns is-multiline">
            {warehouses && warehouses.length ? (
              warehouses.map((warehouse, index) => (

                <WarehouseItem
                  warehouse={warehouse}
                  key={index}
                  removeWarehouse={props.context.removeWarehouse}

                />

              ))
            ) : (
                <div className="column">
                  <span className="title has-text-grey-light">
                    Aun no tienes bodegas
                </span>
                </div>
              )}
          </div>
        )}
      </div>
    </>
  );
};

export default withContext(WarehouseList);
