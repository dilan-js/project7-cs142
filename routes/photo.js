const router = require("express").Router();
const session = require("../middleware/session");
const photoController = require("../controllers/photoController");

/*
 * This function cleans the photos so it's less verbose to handle in frontend
 */
// async function preparePhotos(photos) {

// }

/*
 * URL /photosOfUser/:id - Return the Photos for User (id)
 */
router.get(
  "/user/:id",
  session.parseUserId,
  session.requiresLogin,
  async function (request, response) {
    let id = request.userId;
    const photos = await photoController.byUser(id);
    //   photos = JSON.parse(JSON.stringify(photos));
    if (photos.length === 0) {
      response.status(400).json({ msg: "Nothing found!" });
      return;
    }
    response.status(200).json(photos);
  }
);

/*
 * URL /getPhotoById/:photoId - Returns a specific photo by its id
 */
router.get(
  "/:photoId",
  session.requiresLogin,
  async function (request, response) {
    let photoId = request.params.photoId;
    const specificPhoto = await photoController.get(photoId);
    if (specificPhoto === null) {
      response.status(400).json({ msg: "Nothing found!" });
      return;
    }
    response.status(200).json(specificPhoto);
  }
);

module.exports = router;
