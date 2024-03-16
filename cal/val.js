const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/MST", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    aadhar: String,
    dob: Date,
});

const User = mongoose.model("User", userSchema);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/login1.html");
});


app.post("/register", async function (req, res) {
    try {
        const { aadhar, dob } = req.body;

        const user = new User({
            aadhar: aadhar,
            dob: dob,
        });

        await user.save(); // Save the user's data to the MongoDB collection

        console.log("Data Inserted");
        res.redirect("/"); // Redirect back to the login page
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while registering"); // Handle errors gracefully
    }
});

app.post("/login", async (req, res) => {
    try {
        const { aadhar, dob } = req.body;

        const user = await User.findOne({ aadhar: aadhar, dob: dob });

        if (user) {
            res.json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Login failed. Invalid credentials." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
