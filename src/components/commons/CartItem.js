import React from "react";

const CartItem = props => {
    const { cartItem, cartKey } = props;

    return (
        <div className=" column is-half">
            <div className="box">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img
                                src="https://bulma.io/images/placeholders/128x128.png"
                                alt={cartItem.shortDesc}
                            />
                        </figure>
                    </div>
                    <div className="media-content">
                        <b style={{ textTransform: "capitalize" }}>
                            {cartItem.name}{" "}
                            <span className="tag is-primary">${cartItem.price}</span>
                        </b>
                        <div>{cartItem.shortDesc}</div>
                        <small>{`${cartItem.amount} in cart`}</small>
                    </div>
                    <div
                        className="media-right"
                        onClick={() => props.removeFromCart(cartKey)}
                    >
                        <span className="delete is-large"></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
