const functions = {
  sanitizeData(mongoData) {
    var data = JSON.parse(JSON.stringify(mongoData));
    if (typeof data.__v !== "undefined") {
      delete data.__v;
    }
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        //we are checking if value is an array
        //then we want to call this recursively
        data[key].forEach((value, i) => {
          data[key][i] = this.sanitizeData(value);
        });
      }
    });
    return data;
  },
  minimalUser(user) {
    delete user.location;
    delete user.description;
    delete user.occupation;

    return user;
  },
};

module.exports = functions;
