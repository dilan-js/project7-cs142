const router = require("express").Router();
const photoController = require("../controllers/photoController");
const session = require("../middleware/session");
/*
 * URL /getAllCommentsByUser/:id - Returns all comments by User (id)
 */
router.get(
  "/user/:id",
  session.requiresLogin,
  async function (request, response) {
    var id = request.params.id;
    const photos = await photoController.getAllCommentsByUser(id);
    if (photos === null) {
      response.status(400).json({ msg: "No comments found!" });
    }
    response.status(200).json(photos);
  }
);

module.exports = router;
