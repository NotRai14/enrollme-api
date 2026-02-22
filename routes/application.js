const express = require("express");
const router = express.Router();
const Application = require("../models/Application");


// ============================
// 1️⃣ Student Submit Application
// ============================
router.post("/apply", async (req, res) => {
    try {
        const newApp = new Application(req.body);
        await newApp.save();
        res.json({ message: "Application submitted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ============================
// 2️⃣ Admin Get All Applications
// ============================
router.get("/all", async (req, res) => {
    try {
        const applications = await Application.find();
        res.json(applications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ============================
// 3️⃣ Approve / Reject API
// ============================
router.put("/update-status/:id", async (req, res) => {
    try {
        const { status } = req.body;

        await Application.findByIdAndUpdate(req.params.id, {
            status: status
        });

        res.json({ message: "Status updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ============================
// 4️⃣ ✅ Student Status API (PASTE THIS)
// ============================
router.get("/student/:email", async (req, res) => {
    try {
        const application = await Application.findOne({
            email: req.params.email
        });

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.json(application);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;