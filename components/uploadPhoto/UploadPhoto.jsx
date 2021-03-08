import React from "react";
import { Paper, Button } from "@material-ui/core";

import { Link } from "react-router-dom";
import "./UploadPhoto.css";

import axios from "axios";

class UploadPhoto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadInput: null,
      errorMessage: "",
    };
    this.handleUploadButtonClicked = this.handleUploadButtonClicked.bind(this);
  }

  async handleUploadButtonClicked(e) {
    e.preventDefault();
    const uploadedPhoto = e.target.elements[0].files[0];
    const domForm = new FormData();
    domForm.append("uploadedPhoto", uploadedPhoto);
    try {
      this.setState({ errorMessage: "" });
      const uploadedPhoto = await axios.post("/photos/new", domForm);
      this.props.updateAll();
      this.props.history.push("/photoDetailView/" + uploadedPhoto.data._id);
    } catch (error) {
      console.log(error);
      this.setState({ errorMessage: error.response.data.msg });
    }
    // if (this.uploadInput.files.length > 0) {
    //   // Create a DOM form and add the file to it under the name uploadedphoto

    // }
  }
  componentDidMount() {}

  componentDidUpdate(prevState) {}

  render() {
    return (
      <React.Fragment>
        <Paper>
          <form onSubmit={this.handleUploadButtonClicked}>
            <input type="file" accept="image/*" />
            <input type="submit" value="Upload!" />
            <p>{this.state.errorMessage}</p>
          </form>
        </Paper>
      </React.Fragment>
    );
  }
}

export default UploadPhoto;
