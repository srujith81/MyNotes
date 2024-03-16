const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const db=require('mongoose');
db.set("strictQuery", false);
db.connect("mongodb://127.0.0.1:27017/Aids",(err)=>{
if(err)
        console.log("NOt Connected");
else
{   
        console.log("Db connected :) ");  
}
});
// Create a schema for the Note model
const noteSchema = new db.Schema({
    title: String,
    content: String,
});

// Create the Note model
const Note = db.model('Note', noteSchema);
 

const ns= new db.Schema({
    ano:String,
    dob:Date,
   
});
const table=new db.model("kok",ns);
console.log("table kok created ");
// app.get("/", function(req, res) {
    
// res.sendFile(__dirname + "/login1.html");
// });

app.post("/register",(req, res)=>
 {
    try{
      
    console.log(req.body);
    const record_1=new table({
            ano:req.body.aadhar,
            dob:req.body.dob,
    });
    record_1.save();
    console.log("Data Inserted ");
    }catch(error){
            console.log(error);
    }
    
    // res.sen
    res.sendFile(__dirname + "/login1.html");
    // var result = num1 + num2 ;
    // res.send("<h1>Maths Operation "+(num1+num2)+"</h1>");
    // <h1>${num1}+${num2} sum is ${num1+num2}</h1>");
    // res.send("Data saved");
    // table.find({},(err,data)=>{
            // console.log(data);
    // })
});
app.post("/login", async (req, res) => {
try {
    const { aadhar, dob } = req.body;
    console.log(aadhar,dob)

    const user = await table.findOne({ ano: aadhar, dob: dob });

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


app.get("/", function(req, res) {
        
res.sendFile(__dirname + "/notes.html");
});

// Create a new note
app.post('/api/notes', (req, res) => {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });

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
    Note.find({}, (err, notes) => {
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

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
