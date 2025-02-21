const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const USER_ID = "Riya_10043";
const EMAIL = "riya10.work@gmail.com";
const ROLL_NUMBER = "10043";

// 📌 POST Method: Process Data
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;

        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        let numbers = [];
        let alphabets = [];

        // Separate numbers and alphabets
        data.forEach((item) => {
            if (!isNaN(Number(item))) {
                numbers.push(Number(item)); // Convert to number
            } else if (typeof item === "string" && item.length === 1) {
                alphabets.push(item);
            }
        });

        // Find highest alphabet (case insensitive)
        alphabets.sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));
        const highestAlphabet = alphabets.length > 0 ? [alphabets[alphabets.length - 1]] : [];

        // Construct response
        res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });

    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

// 📌 GET Method: Returns operation_code
app.get("/bfhl", (req, res) => {
    res.json({ operation_code: 1 });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
