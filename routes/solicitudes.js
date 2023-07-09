const { Router } = require("express");

const {
  getRequests,
  getRequestsByProf,
  getRequestsByProfAndDate,
  getRequestsByDate,
  createRequest,
} = require("../controllers/solicitudes");

const router = Router();

router.get("/", getRequests);
router.get("/by-prof", getRequestsByProf);
router.get("/by-prof-and-date", getRequestsByProfAndDate);
router.get("/by-date", getRequestsByDate);
router.post("/", createRequest);

module.exports = router;
