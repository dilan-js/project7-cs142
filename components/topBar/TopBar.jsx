import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import "./TopBar.css";

import axios from "axios";
/**
 * Define TopBar, a React componment of CS142 project #5
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: "",
      userId: "",
      versionNumber: "",
      user: null,
    };
    this.readRouteAndUserId = this.readRouteAndUserId.bind(this);
  }

  async readRouteAndUserId() {
    let userIdFromURL = this.props.location.pathname.split("/");
    this.setState({ route: userIdFromURL[1], userId: userIdFromURL[2] });
    try {
      const { data } = await axios.get("/test/info");
      this.setState({ versionNumber: data.version });
    } catch (error) {
      console.log(error);
    }
    try {
      if (
        this.state.userId &&
        (this.state.route === "users" ||
          this.state.route === "photos" ||
          this.state.route === "comments")
      ) {
        const user = await axios.get("/user/" + this.state.userId);
        this.setState({ user: user.data });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.readRouteAndUserId();
  }

  componentDidUpdate(prevState) {
    if (prevState.location.pathname !== this.props.location.pathname) {
      this.readRouteAndUserId();
    }
  }

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar>
          <Link className="cs142-topBar-left-link" to="/" replace>
            <Typography className="cs142-topbar-nameTitle">
              {`Dilan Nana v${this.state.versionNumber}.0`}
            </Typography>
          </Link>
          <FormControlLabel
            label="Extra Credit"
            control={
              <Switch
                checked={this.props.extraCredit}
                onChange={(e) => this.props.handleExtraCreditToggle(e)}
                name="extraCreditSwitch"
                inputProps={{ "aria-label": "secondary checkbox" }}
              ></Switch>
            }
          ></FormControlLabel>

          <Typography
            className="cs142-topBar-right"
            variant="h5"
            color="inherit"
          >
            {this.state.route === "photos" ? `Photos of ` : null}
            {this.state.route === "comments" ? `Comments by ` : null}
            {this.state.user && this.state.route !== ""
              ? `${this.state.user.first_name} ${this.state.user.last_name}`
              : null}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
