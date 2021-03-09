const User = require("../schema/user");
const functions = require("../utils/globalFunctions");
const Photo = require("../schema/photo");
const bcrypt = require("bcrypt");

const userController = {
  async all() {
    var userList = JSON.parse(JSON.stringify(await User.find()));
    userList.forEach((user, i) => {
      userList[i] = functions.minimalUser(functions.sanitizeData(user));
    });
    return userList;
  },
  async info(userId) {
    const userInfo = {
      userId: userId,
      numPhotos: 0,
      numComments: 0,
    };
    var photos = await Photo.find();
    photos.forEach((photo) => {
      if (photo.user_id.toString() === userId) {
        userInfo.numPhotos++;
      }
      photo.comments.forEach((comment) => {
        if (comment.user_id.toString() === userId) {
          userInfo.numComments++;
        }
      });
    });
    return userInfo;
  },
  async get(userId) {
    var user = await User.findById(userId);
    // console.log("FOUND USER");
    if (user !== null) {
      return functions.sanitizeData(user);
    }
    return null;
  },
  async create(credentials) {
    try {
      // const saltPassword = await bcrypt.hash(credentials.password, 10);
      // credentials.password = saltPassword;
      return await User.create(credentials);
    } catch (error) {
      return false;
    }
  },
  async login(credentials) {
    console.log("IN LOGIN");
    const user = await User.findOne({ login_name: credentials.login_name });
    if (!user) {
      return false;
    }
    console.log();
    // const isPasswordCorrect = await bcrypt.compare(
    //   credentials.password,
    //   user.password
    // );
    var isPasswordCorrect = false;
    if (credentials.password === user.password) {
      isPasswordCorrect = true;
    }
    if (!isPasswordCorrect) {
      console.log("NO passwqord correct");

      return false;
    }
    return this.get(user._id);
  },
};

module.exports = userController;
