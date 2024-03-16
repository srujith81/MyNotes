const express = require("express");
const session = require('express-session');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.set("strictQuery", false);

app.use(session({
  secret: 'your-secret-key', // A secret key to sign the session ID cookie
  resave: false, // Don't save the session if it hasn't changed
  saveUninitialized: true, // Save a new session but not modified one
  cookie: { secure: false } // Use 'secure: true' for HTTPS connections
}));

mongoose.connect("mongodb://127.0.0.1:27017/Rolex", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log("Not Connected");
    } else {
        console.log("Db connected :)");
    }
});

const ns = new mongoose.Schema({
    ano: String,
    dob: Date,
});

const noteSchema = new mongoose.Schema({
	userano: String,
    title: String,
    content: String,
});
console.log(noteSchema);

const table = new mongoose.model("Login", ns);
const Note = new mongoose.model('Note', noteSchema);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/login1.html");
});

app.post("/register", async function (req, res) {
    try {
        console.log(req.body);
        const record_1 = new table({
            ano: req.body.aadhar,
            dob: req.body.dob,
        });
        record_1.save();
        console.log("Data Inserted ");
    } catch (error) {
        console.log(error);
    }
    res.sendFile(__dirname + "/login1.html");
});

app.post("/login", async (req, res) => {
    try {
        const { aadhar, dob } = req.body;
        const user = await table.findOne({ ano: aadhar, dob: dob });

        if (user) {
			req.session.user = aadhar;
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
app.post('/api/notes', (req, res) => {
    const { title, content } = req.body;
	const name=req.session.user;
	console.log(name);
    const newNote = new Note({  
		userano:name,
		title: title,
        content: content
	});
	console.log(newNote);
    newNote.save((err, note) => {
        if (err) {
            res.status(500).json({ message: 'Error creating note' });
        } else {
            res.json({ message: 'Note created', note });
        }
    });
});

// Get all notes
app.get('/api/notes', (req, res) => {
    Note.find({userano:req.session.user}, (err, notes) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching notes' });
        } else {
            res.json({ notes });
        }
    });
});

// Update a note
app.put('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const { title, content } = req.body;
    Note.findByIdAndUpdate(
        noteId,
        { title, content },
        { new: true },
        (err, note) => {
            if (err) {
                res.status(500).json({ message: 'Error updating note' });
            } else {
                res.json({ message: 'Note updated', note });
            }
        }
    );
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    Note.findByIdAndRemove(noteId, (err) => {
        if (err) {
            res.status(500).json({ message: 'Error deleting note' });
        } else {
            res.json({ message: 'Note deleted' });
        }
    });
});

app.get('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    } else {
      res.redirect('/');
    }
  });
});


app.listen(3000, function () {
    console.log("server is running on port 3000");
});
