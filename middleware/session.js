const sessionMiddleware = {
  parseUserId(request, response, next) {
    var id = request.params.id;
    const regex = /[a-z0-9]{24}$/gm;
    if (!id.match(regex)) {
      response
        .status(400)
        .json(
          "Hi there! The user you are trying to access does not exist. Please try an alternative."
        )
        .end();
    }
    request.userId = id;
    next();
  },

  assign(session, obj) {
    const cleanObj = JSON.parse(JSON.stringify(obj));
    delete cleanObj.password;
    session.user = cleanObj;
  },
  requiresLogin(request, response, next) {
    console.log("requires login");
    console.log("req sesh user: ", request.session.user);
    if (typeof request.session.user !== "undefined") {
      request.user = request.session.user;
      console.log(request.user);
      next();
    } else {
      response.status(401).json({ msg: "Unauthorized" }).end();
      console.log("error!");
    }
  },
};

module.exports = sessionMiddleware;
