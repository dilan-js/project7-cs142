import React from "react";
import { Typography, Paper, Switch, FormControlLabel } from "@material-ui/core";

import { Link } from "react-router-dom";
import "./LoginRegister.css";

import axios from "axios";
/**
 * Define TopBar, a React componment of CS142 project #5
 */
class LoginRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistering: false,
      credentials: {
        login_name: "",
        password: "",
      },
    };

    this.submitUserName = this.submitUserName.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(e) {
    let update = Object.assign({}, this.state.credentials);
    update[e.target.name] = e.target.value;
    this.setState({ credentials: update });
  }

  submitUserName(e) {
    e.preventDefault();
    let endpoint = "/admin/login";
    if (this.state.isRegistering) {
      endpoint = "/admin/register";
    }

    axios.post(endpoint, this.state.credentials);
  }

  componentDidMount() {}

  componentDidUpdate(prevState) {}

  render() {
    return (
      <React.Fragment>
        <Paper>
          <form onSubmit={this.submitUserName}>
            <label>
              Login Name:
              <input
                type="text"
                name="login_name"
                value={this.state.credentials.login_name}
                onChange={this.updateState}
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={this.state.credentials.password}
                onChange={this.updateState}
              />
            </label>
            {this.state.isRegistering && (
              <React.Fragment>
                <label>
                  First Name:
                  <input type="text" name="first_name" />
                </label>
                <label>
                  Last Name:
                  <input type="text" name="last_name" />
                </label>

                <label>
                  Location:
                  <input type="text" name="location" />
                </label>
                <label>
                  Description:
                  <input type="text" name="description" />
                </label>
                <label>
                  Occupation:
                  <input type="text" name="occupation" />
                </label>
              </React.Fragment>
            )}
            <input type="submit" value="submit" />
            <FormControlLabel
              label="Register"
              control={
                <Switch
                  checked={this.state.isRegistering}
                  onChange={(e) =>
                    this.setState({ isRegistering: e.target.checked })
                  }
                  name="loginRegisterSwitch"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                ></Switch>
              }
            ></FormControlLabel>
          </form>
        </Paper>
      </React.Fragment>
    );
  }
}

export default LoginRegister;
