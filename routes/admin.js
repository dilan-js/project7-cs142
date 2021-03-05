const router = require("express").Router();
const session = require("../middleware/session");
const userController = require("../controllers/userController");

/*
 * URL /user/list - Return all the User object.
 */
router.post("/login", async function (request, response) {
  session.assign(request.session, request.body);
  console.log(request.session);
  response.status(200).json({ msg: "Hi!" });
});

router.post("/register", async function (request, response) {
  const newUser = await userController.create(request.body);
  if (!newUser) {
    response.status(403).json({ msg: "Registration could not be processed." });
  }
  session.assign(newUser);
  //   delete newUser.password;
  response.json(newUser);
});

router.get("/test", session.requiresLogin, async function (request, response) {
  response.json({ msg: "YOOOOOOOOOOOOO" });
});
router.post("/logout", async function (request, response) {});

module.exports = router;
