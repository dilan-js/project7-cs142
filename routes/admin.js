const router = require("express").Router();
const session = require("../middleware/session");
const userController = require("../controllers/userController");

/*
 * URL /user/list - Return all the User object.
 */
router.post("/login", async function (request, response) {
  const user = await userController.login(request.body);
  if (!user) {
    return response.status(401).json({ msg: "Login failed" });
  }
  session.assign(request.session, user);
  response.json(user);
});

router.post("/register", async function (request, response) {
  const newUser = await userController.create(request.body);
  if (!newUser) {
    response.status(400).json({ msg: "Registration could not be processed." });
  }
  session.assign(request.session, newUser);
  //   delete newUser.password;
  response.json(newUser);
});

router.get("/test", session.requiresLogin, async function (request, response) {
  response.json({ msg: "YOOOOOOOOOOOOO" });
});
router.post("/logout", async function (request, response, next) {
  if (!request.session.user) {
    response.status(400).json({ msg: "Logout failed" }).end();
    next();
  } else {
    //empty the session
    request.session.destroy((err) => {
      if (err) {
        response.status(400).json({ msg: "Logout failed" }).end();
        next();
      } else {
        response.json({ msg: "Successfully logged out." });
      }
    });
  }
});

module.exports = router;
