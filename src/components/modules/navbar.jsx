import React from "react";
import withContext from "./../../context/withContext";

import { Link } from "react-router-dom";


const Navbar = (props) => {
    const context = props.context;

    const getTotalItemInCart = () => {
        let total = 0

        Object.keys(context.cart).forEach((key) => {
            total = total + context.cart[key].amount
        })

        return total
    }

    return (
        <nav
            className="navbar container"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <Link to="/">
                    <b className="navbar-item is-size-5 ">Noise Store</b>
                </Link>
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
                    <span className="navbar-item is-hoverable navbar-item-color">

                        <span>Administrar</span>
                        <div className="navbar-dropdown">
                            <Link to="/myproducts" className="navbar-item">
                                Productos
                            </Link>
                            <Link to="/warehouses" className="navbar-item">
                                Bodegas
                            </Link>
                        </div>
                    </span>
                )}

                <Link to="/cart" className="navbar-item">
                    Mi carrito
                    <span
                        className="tag is-primary"
                        style={{ marginLeft: "5px" }}
                    >
                        {getTotalItemInCart()}
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

