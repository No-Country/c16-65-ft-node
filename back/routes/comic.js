const express = require("express");
const router = express.Router();
const ComicController = require("../controllers/comic");

router.post("/create", ComicController.create);

module.exports = router;
