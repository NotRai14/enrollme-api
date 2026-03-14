const express = require("express");
const router = express.Router();
const Application = require("../models/Application");


// ============================
// 1️⃣ Student Submit Application
// ============================
router.post("/apply", async (req, res) => {
    try {
        console.log("🔥 Apply route hit");
        console.log("📦 Incoming data:", req.body);

        // Check if body is empty
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is empty" });
        }

        // ✅ REMOVE empty userId to avoid Mongo ObjectId error
        if (!req.body.userId || req.body.userId === "") {
            delete req.body.userId;
        }

        const newApp = new Application(req.body);
        await newApp.save();

        console.log("✅ Application saved");

        res.json({ message: "Application submitted successfully" });

    } catch (err) {
        console.error("❌ Submit error:", err);
        res.status(500).json({ error: err.message });
    }
});


// ============================
// 2️⃣ Admin Get All Applications
// ============================
router.get("/all", async (req, res) => {
    try {
        console.log("📊 Fetching all applications");

        const applications = await Application.find();
        res.json(applications);

    } catch (err) {
        console.error("❌ Fetch error:", err);
        res.status(500).json({ error: err.message });
    }
});


// ============================
// 3️⃣ Approve / Reject API
// ============================
router.put("/update-status/:id", async (req, res) => {
    try {
        console.log("🔄 Updating status:", req.params.id, req.body);

        const { status } = req.body;

        await Application.findByIdAndUpdate(req.params.id, {
            status: status
        });

        res.json({ message: "Status updated successfully" });

    } catch (err) {
        console.error("❌ Update error:", err);
        res.status(500).json({ error: err.message });
    }
});


// ============================
// 4️⃣ Student Status API
// ============================
// Student status by email
router.get("/student/:email", async (req, res) => {
    try {

        const email = req.params.email;

        const application = await Application.findOne({ email: email });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.json(application);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router;
