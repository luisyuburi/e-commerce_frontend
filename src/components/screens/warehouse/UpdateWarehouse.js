import React, { Component } from "react";
import withContext from "../../../context/withContext";
import { Redirect } from "react-router-dom";
import axios from 'axios';



class UpdateWarehouse extends Component {
  id = this.props.match.params.id;
  constructor(props) {
    super(props);
    this.state = {
      warehouse: undefined,
      status: null
    }
  }

  componentDidMount() {
    this.getWarehouse()
  }

  getWarehouse = async () => {
    this.setState({ status: "loading" })
    const warehouseResponse = await axios.get(
      'http://localhost:8000/api/warehouses/' + this.id
    )
    this.setState({
      status: null,
      warehouse: warehouseResponse.data.data
    })
  }

  save = async (e) => {
    e.preventDefault();
    const { name, location } = this.state.warehouse;
    if (name && location) {

      await axios.patch(
        'http://localhost:8000/api/warehouses/' + this.id,
        { id: this.id, name, location },
      )

      this.props.context.UpdateWarehouse(
        {
          name,
          location
        },
        () => { }
      );
      this.setState(
        { flash: { status: 'is-success', msg: 'Warehouse updated successfully' } }
      );

    } else {
      this.setState(
        { flash: { status: 'is-danger', msg: 'Please enter name and location' } }
      );
    }
  };

  handleChange = e => {
    const warehouse = this.state.warehouse;

    warehouse[e.target.name] = e.target.value
    this.setState({ warehouse });
  }

  render() {


    const { user } = this.props.context;
    return user === null ? (
      <Redirect to="/" />
    ) : (
        <>
          <div className="hero is-primary ">
            <div className="hero-body container">
              <h4 className="title">Update Warehouse</h4>
            </div>
          </div>
          <br />
          <br />
          {this.state.status === "loading" && (
            <span className="button is-loading ">Loading</span>

          )}
          {this.state.warehouse && (

            <form onSubmit={this.save}>
              <div className="columns is-mobile is-centered">
                <div className="column is-one-third">
                  <div className="field">
                    <label className="label">Warehouse Name: </label>
                    <input
                      className="input"
                      type="text"
                      name="name"
                      defaultValue={this.state.warehouse.name}
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
                      defaultValue={this.state.warehouse.location}
                      onChange={this.handleChange}
                      required
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
                      Update
                </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </>
      );
  }
}

export default withContext(UpdateWarehouse);
