const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/LBRCE", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log("Not Connected");
    } else {
        console.log("Db connected :)");
    }
});

const userSchema = new mongoose.Schema({
    ano: String,
    dob: Date,
});

const User = mongoose.model("User", userSchema);

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: String,
    content: String,
});

const Note = mongoose.model("Note", noteSchema);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/login1.html");
});

app.post("/register", async function (req, res) {
    try {
        console.log(req.body);
        const { aadhar, dob } = req.body;
        const newUser = new User({ ano: aadhar, dob });
        await newUser.save();
        console.log("User registered");
    } catch (error) {
        console.log(error);
    }
    res.sendFile(__dirname + "/login1.html");
});

app.post("/login", async (req, res) => {
    try {
        const { aadhar, dob } = req.body;
        const user = await User.findOne({ ano: aadhar, dob: dob });

        if (user) {
            res.redirect('/notes');
        } else {
            res.status(401).json({ message: "Login failed. Invalid credentials." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/notes", function (req, res) {
    res.sendFile(__dirname + "/notes1.html");
});

// Create a new note
app.post('/api/notes', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const { title, content } = req.body;
            const newNote = new Note({ user: req.user._id, title, content });
            await newNote.save();
            res.json({ message: 'Note created', note: newNote });
        } else {
            res.status(401).json({ message: 'Not authenticated' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating note' });
    }
});

// Get all notes for the currently logged-in user
app.get("/api/notes", async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const notes = await Note.find({ user: req.user._id });
            res.json({ notes });
        } else {
            res.status(401).json({ message: "Not authenticated" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching notes" });
    }
});

// Update a note
app.put('/api/notes/:id', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const noteId = req.params.id;
            const { title, content } = req.body;
            const updatedNote = await Note.findByIdAndUpdate(
                noteId,
                { title, content },
                { new: true }
            );
            res.json({ message: 'Note updated', note: updatedNote });
        } else {
            res.status(401).json({ message: "Not authenticated" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating note' });
    }
});

// Delete a note
app.delete('/api/notes/:id', async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const noteId = req.params.id;
            await Note.findByIdAndRemove(noteId);
            res.json({ message: 'Note deleted' });
        } else {
            res.status(401).json({ message: "Not authenticated" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting note' });
    }
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
