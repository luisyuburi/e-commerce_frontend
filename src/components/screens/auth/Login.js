import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withContext from "../../../context/withContext";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      status: null
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  login = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    if (!email || !password) {
      return this.setState({ error: "Fill all fields!" });
    }

    this.setState({ status: "loading" })

    const loggedIn = await this.props.context.login(email, password)

    this.setState({ status: null })

    if (!loggedIn) {
      this.setState({ error: "Invalid Credentails" });
    }
  };

  render() {
    return !this.props.context.user ? (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Iniciar sesion</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.login}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label name="email" className="label">Email: </label>
                <input
                  className="input"
                  type="email"
                  name="email"
                  onChange={this.handleChange}
                  disabled={this.state.status === "loading"}
                />
              </div>
              <div className="field">
                <label className="label">Password: </label>
                <input
                  className="input"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  disabled={this.state.status === "loading"}

                />
              </div>
              {this.state.error && (
                <div className="has-text-danger">{this.state.error}</div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  disabled={this.state.status === "loading"}

                >
                  {this.state.status === "loading" ? "Cargando..." :
                    "Submit"}

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

export default withContext(Login);
