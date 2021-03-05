import React from "react";
import { Typography } from "@material-ui/core";

import { Link } from "react-router-dom";

import axios from "axios";

/**
 * Define PhotoDetailView, a React componment of CS142 project #5
 */
class PhotoDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPhotos: [],
    };
    this.getPhotoById = this.getPhotoById.bind(this);
  }

  async getPhotoById(photoId) {
    try {
      const { data } = await axios.get("/photo/" + photoId);
      this.setState({ userPhotos: data });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getPhotoById(this.props.match.params.photoId);
  }

  render() {
    if (this.state.userPhotos.length === 0) {
      return <h1>There are no photos!</h1>;
    } else {
      return (
        <div>
          {this.state.userPhotos.map((photo) => (
            <React.Fragment key={photo._id}>
              <img
                className="cs142-userPhotos-photo"
                src={"/images/" + photo.file_name}
                alt={photo.file_name}
              ></img>
              <Typography variant="h6">
                Date & Time : {photo.date_time}
              </Typography>
              <div>
                <Typography variant="h6">Comments:</Typography>
                {photo.comments ? (
                  photo.comments.map((comment) => (
                    <div key={comment._id}>
                      <Typography>
                        Author:{" "}
                        <Link to={"/users/" + comment.user._id}>
                          {comment.user.first_name}
                        </Link>
                      </Typography>
                      <Typography>Posted: {comment.date_time}</Typography>
                      <Typography>Comment: {comment.comment}</Typography>
                    </div>
                  ))
                ) : (
                  <Typography>No comments</Typography>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      );
    }
  }
}

export default PhotoDetailView;
