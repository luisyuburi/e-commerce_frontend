import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../withContext";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      email: undefined,
      password: undefined,
      c_password: undefined,
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  register = async (e) => {
    e.preventDefault();

    const { name, email, password, c_password } = this.state;
    if (!name || !email || !password) {
      return this.setState({ error: "Fill all fields!" });
    }

    const registered = await this.props.context.Register(name, email, password, c_password)

    if (!registered) {
      this.setState({ error: "Ha ocurrido un error" });
    }
  };

  render() {

    return !this.props.context.user ? (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Register</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.register}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
            
            <div className="field">
                <label className="label">Nombre: </label>
                <input
                  className="input"
                  type="name"
                  name="name"
                  onChange={this.handleChange}
                />
              </div>
              
              <div className="field">
                <label className="label">Email: </label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Password: </label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>

              <div className="field">
                <label className="label">Confirm Password: </label>
                <input
                  className="input"
                  type="password"
                  name="c_password"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error && (
                <div className="has-text-danger">{this.state.error}</div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </>
    ) : (
        <Redirect to="/products" />
      );
  }
}

export default withContext(Register);
