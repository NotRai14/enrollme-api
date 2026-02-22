const auth = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const {
    submitApplication,
    getMyApplications,
    getAllApplications,
    updateStatus
} = require("../controllers/applicationController");

// Student routes (with auth)
router.post("/submit", auth, submitApplication);
router.get("/user/:userId", auth, getMyApplications);

// Admin routes (with auth)
router.get("/all", auth, getAllApplications);
router.put("/status/:id", auth, updateStatus);

module.exports = router;