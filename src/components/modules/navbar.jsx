import React from "react";
import withContext from "./../../withContext";

import { Link } from "react-router-dom";


const Navbar = (props) => {
    const context = props.context;
    return (
        <nav
            className="navbar container"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <b className="navbar-item is-size-5 ">Noise Store</b>
                <label
                    role="button"
                    className="navbar-burger burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    onClick={e => {
                        e.preventDefault();
                        this.setState({ showMenu: !context.showMenu });
                    }}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </label>
            </div>
            <div className={`navbar-menu ${context.showMenu ? "is-active" : ""
                }`}>

                <Link to="/products" className="navbar-item">
                    Products
          </Link>

                {context.user && (
                    <Link to="#" className="navbar-item is-hoverable navbar-item-color">

                        <a>Administrar</a>
                        <Link to="/myproducts" className="navbar-dropdown">
                            <a className="navbar-item">
                                Administrar Productos</a>

                            <Link to="/add-product" className="navbar-item">
                                Agregar producto
                    </Link>

                    <Link to="/add-warehouse" className="navbar-item">
                                Agregar Bodega
                    </Link>

                            <Link to="/warehouses" className="navbar-item">
                                Administrar Bodegas
                    </Link>
                        </Link>
                    </Link>
                )}

                <Link to="/cart" className="navbar-item">
                    Mi carrito
            <span
                        className="tag is-primary"
                        style={{ marginLeft: "5px" }}
                    >
                        {Object.keys(context.cart).length}
                    </span>
                </Link>
                {context.user === undefined && (
                    <span className="navbar-item">Cargando</span>
                )}
                {context.user === null && (
                    <React.Fragment>

                        <Link to="/login" className="navbar-item">
                            Iniciar sesion
            </Link>

                        <Link to="/register" className="navbar-item">
                            Register
                </Link>

                    </React.Fragment>
                )}

                {context.user && (
                    <Link to="/" onClick={context.logout} className="navbar-item">
                        Logout
                    </Link>
                )}
            </div>



        </nav>
    )
}

export default withContext(Navbar);

