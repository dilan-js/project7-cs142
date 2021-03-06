import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Grid, Paper } from "@material-ui/core";
import "./styles/main.css";

// import necessary components
import TopBar from "./components/topBar/TopBar";
import UserDetail from "./components/userDetail/UserDetail";
import UserList from "./components/userList/UserList";
import UserPhotos from "./components/userPhotos/UserPhotos";
import CommentView from "./components/commentView/CommentView";
import PhotoDetailView from "./components/photoDetailView/PhotoDetailView";
import LoginRegister from "./components/loginRegister/LoginRegister";
import UploadPhoto from "./components/uploadPhoto/UploadPhoto";

import axios from "axios";

class PhotoShare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extraCredit: true,
      user: null,
      update: Date.now(),
    };
    this.handleExtraCreditToggle = this.handleExtraCreditToggle.bind(this);
    this.globalLogin = this.globalLogin.bind(this);
    this.globalLogout = this.globalLogout.bind(this);
    this.updateAll = this.updateAll.bind(this);
  }

  handleExtraCreditToggle = (e) => {
    this.setState({ extraCredit: e.target.checked });
  };

  componentDidMount() {
    if (sessionStorage.getItem("user") !== null) {
      this.setState({ user: JSON.parse(sessionStorage.getItem("user")) });
    }
  }

  globalLogin(user) {
    sessionStorage.setItem("user", JSON.stringify(user));
    this.setState({ user: user });
  }

  async globalLogout() {
    this.setState({ user: null });
    try {
      await axios.post("/admin/logout");
    } catch (error) {
      console.log(error);
    }
    sessionStorage.clear();
  }

  updateAll() {
    this.setState({ update: Date.now() });
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <Route
                path="/"
                render={(props) => (
                  <TopBar
                    {...props}
                    extraCredit={this.state.extraCredit}
                    handleExtraCreditToggle={this.handleExtraCreditToggle}
                    user={this.state.user}
                    logOut={this.globalLogout}
                  />
                )}
              />
            </Grid>
            <div className="cs142-main-topbar-buffer" />
            {this.state.user ? (
              <React.Fragment>
                <Grid item sm={3}>
                  <Paper className="cs142-main-grid-item">
                    <UserList
                      extraCredit={this.state.extraCredit}
                      logOut={this.globalLogout}
                      update={this.state.update}
                    />
                  </Paper>
                </Grid>
                <Grid item sm={9}>
                  <Paper className="cs142-main-grid-item">
                    <Switch>
                      {this.state.user && (
                        <React.Fragment>
                          <Route
                            path="/users/:userId"
                            render={(props) => <UserDetail {...props} />}
                          />
                          <Route
                            path="/photos/:userId"
                            render={(props) => <UserPhotos {...props} />}
                          />
                          <Route
                            path="/comments/:userId"
                            render={(props) => <CommentView {...props} />}
                          />
                          <Route
                            path="/photoDetailView/:photoId"
                            render={(props) => <PhotoDetailView {...props} />}
                          />
                          <Route exact path="/users" component={UserList} />
                          {/* <Route
                            exact
                            path="/uploadPhoto"
                            component={UploadPhoto}
                            updateAll={this.updateAll}
                          /> */}
                          <Route
                            exact
                            path="/uploadPhoto"
                            render={(props) => (
                              <UploadPhoto
                                {...props}
                                updateAll={this.updateAll}
                              />
                            )}
                          />
                        </React.Fragment>
                      )}
                    </Switch>
                  </Paper>
                </Grid>
              </React.Fragment>
            ) : (
              <Grid item sm={9}>
                <Paper className="cs142-main-grid-item">
                  <Route
                    path="/"
                    render={(props) => (
                      <LoginRegister
                        {...props}
                        globalLogin={this.globalLogin}
                      />
                    )}
                  />
                </Paper>
              </Grid>
            )}
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<PhotoShare />, document.getElementById("photoshareapp"));
