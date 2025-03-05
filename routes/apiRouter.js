import School from "../models/Schools.js"; // Import School model
import { Router } from "express";
import haversine from "haversine-distance"; // Import Haversine for distance calculation

const router = Router();

// ✅ Test Route
router.get("/", (req, res) => {
    console.log("Hello, it's /");
    res.send("Welcome to the Schools API!");
});

// ✅ Add School API
router.post("/addSchool", async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // ✅ Input Validation
        if (!name || !address || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ error: "All fields are required." });
        }
        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ error: "Latitude and longitude must be numbers." });
        }

        // ✅ Insert into Database
        const school = await School.create({ name, address, latitude, longitude });
        return res.status(201).json({ message: "School added successfully!", school });

    } catch (error) {
        console.error("Error adding school:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

// ✅ List Schools API (Sorted by Distance)
router.get("/listSchools", async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // ✅ Input Validation
        if (!latitude || !longitude) {
            return res.status(400).json({ error: "Latitude and longitude are required." });
        }
        const userLocation = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };

        // ✅ Fetch all schools
        const schools = await School.findAll();

        // ✅ Sort Schools by Distance (Using Haversine Formula)
        const sortedSchools = schools.map(school => {
            const schoolLocation = { latitude: school.latitude, longitude: school.longitude };
            const distance = haversine(userLocation, schoolLocation) / 1000; // Convert meters to km
            return { ...school.toJSON(), distance };
        }).sort((a, b) => a.distance - b.distance); // Sort by nearest

        res.json({ message: "Schools sorted by distance", schools: sortedSchools });

    } catch (error) {
        console.error("Error fetching schools:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

export default router;
