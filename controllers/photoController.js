const User = require("../schema/user");
const functions = require("../utils/globalFunctions");
const Photo = require("../schema/photo");

const photoController = {
  async preparePhoto(photo) {
    photo = functions.sanitizeData(photo);
    for (var j = 0; j < photo.comments.length; j++) {
      const user = await User.findById(photo.comments[j].user_id);
      photo.comments[j].user = functions.minimalUser(
        functions.sanitizeData(user)
      );
      delete photo.comments[j].user_id;
    }

    return photo;
  },
  async preparePhotos(photos) {
    for (var i = 0; i < photos.length; i++) {
      photos[i] = await this.preparePhoto(photos[i]);
    }
    return photos;
  },
  async byUser(userId) {
    let photos = await Photo.find({ user_id: userId });
    return await this.preparePhotos(photos);
  },
  async get(photoId) {
    //COME BACK AND FIGURE OUT WHY SP IS AN ARRAY???
    let specificPhoto = await Photo.find({ _id: photoId });
    return await this.preparePhotos(specificPhoto);
  },
  async getAllCommentsByUser(userId) {
    var photos = await Photo.find().where("comments.user_id").equals(userId);
    return photos;
  },
};

module.exports = photoController;
