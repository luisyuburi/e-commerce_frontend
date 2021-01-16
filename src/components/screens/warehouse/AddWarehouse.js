import React, { Component } from "react";
import withContext from "../../../context/withContext";
import { Redirect } from "react-router-dom";
import axios from 'axios';

const initState = {
  name: "",
  location: "",
};

class AddWarehouse extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  save = async (e) => {
    e.preventDefault();
    const { name, location } = this.state;

    if (name && location) {
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36);

      await axios.post(
        'http://localhost:8000/api/warehouses',
        { id, name, location },
      )

      this.props.context.addWarehouse(
        {
          name,
          location
        },
        () => this.setState(initState)
      );
      this.setState(
        { flash: { status: 'is-success', msg: 'Warehouse created successfully' } }
      );

    } else {
      this.setState(
        { flash: { status: 'is-danger', msg: 'Please enter name and location' } }
      );
    }
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  render() {
    const { name, location } = this.state;
    const { user } = this.props.context;


    return !user ? (
      <Redirect to="/" />
    ) : (
        <>
          <div className="hero is-primary ">
            <div className="hero-body container">
              <h4 className="title">Add Warehouse</h4>
            </div>
          </div>
          <br />
          <br />
          <form onSubmit={this.save}>
            <div className="columns is-mobile is-centered">
              <div className="column is-one-third">
                <div className="field">
                  <label className="label">Name: </label>
                  <input
                    className="input"
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    required
                  />
                </div>

                <div className="field">
                  <label className="label">Location: </label>
                  <input
                    className="input"
                    type="text"
                    name="location"
                    value={location}
                    onChange={this.handleChange}
                  />
                </div>


                {this.state.flash && (
                  <div className={`notification ${this.state.flash.status}`}>
                    {this.state.flash.msg}
                  </div>
                )}
                <div className="field is-clearfix">
                  <button
                    className="button is-primary is-outlined is-pulled-right"
                    type="submit"
                    onClick={this.save}

                  >
                    Submit
                </button>
                </div>
              </div>
            </div>
          </form>
        </>
      );
  }
}

export default withContext(AddWarehouse);
