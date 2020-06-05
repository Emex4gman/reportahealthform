const express = require("express");
const router = express.Router();
const authRoutes = require('./auth.route')
const facilityRoutes = require('./facility.route')

router.get("/status", (req, res) => res.send("OK"));

router.use("/auth", authRoutes);
router.use("/facility", facilityRoutes);

module.exports = router;

