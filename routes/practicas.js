const { Router } = require("express");

const getAssignments = require("../controllers/practicas");

const router = Router();
router.get("/", getAssignments);

module.exports = router;
