const router = require("express").Router();
const session = require("../middleware/session");
const userController = require("../controllers/userController");

/*
 * This function cleans the user object for return
 */

/*
 * URL /user/list - Return all the User object.
 */
router.get(
  "/user/list",
  session.requiresLogin,
  async function (request, response) {
    response.status(200).send(await userController.all());
  }
);

/*
 * URL /user/getAllUserInfo - Return the respective number of comments
 * and photos associated with all users.
 */
router.get(
  "/user/getAllUserInfo",
  session.requiresLogin,
  async function (request, response) {
    const userContainer = await userController.all();
    for (var i = 0; i < userContainer.length; i++) {
      userContainer[i].info = await userController.info(userContainer[i]._id);
    }
    response.status(200).json(userContainer);
  }
);

/*
 * URL /user/:id - Return the information for User (id)
 */
router.get(
  "/user/:id",
  session.requiresLogin,
  session.parseUserId,
  async function (request, response) {
    var user = await userController.get(request.params.id);
    if (user === null) {
      response
        .status(400)
        .json(
          "Hi there! The user you are trying to access does not exist. Please try an alternative."
        );
      return;
    }
    response.status(200).json(user);
  }
);

// router.post("/user" async function(request, response){

// })

module.exports = router;
