const express = require("express");
const controller = require("../controllers/eventController");
const {fileUpload} = require("../middleware/fileUpload");
const {isLoggedIn, isAuthor} = require("../middleware/auth");
const {validateId} = require("../middleware/validator");

const router = express.Router();

//GET /events - send all events to user
router.get("/", controller.index);

//GET /events/new - send create event form
router.get("/new", isLoggedIn, controller.new);

//POST /events - post event
router.post("/", isLoggedIn, fileUpload, controller.create);

//GET /events/:id - send details of event at (id)
router.get("/:id", controller.show);

//GET /events/:id/edit - send edit event form
router.get("/:id/edit", isLoggedIn, isAuthor, controller.edit);

//PUT /events/:id - update from edit
router.put("/:id", isLoggedIn, isAuthor, fileUpload, controller.update);

//DELETE /events/:id - delete event with (id)
router.delete("/:id", isLoggedIn, isAuthor, controller.delete);

//PUT /events/rsvp - rsvp event
router.put("/:id/rsvp", isLoggedIn, controller.rsvp);

module.exports = router;