const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8018;

app.set('view engine', 'ejs');

// Configure Express to use EJS as the template engine
mongoose.connect('mongodb://127.0.0.1:27017/Basha', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', {
    First_Name: String,
    Last_Name: String,
    Age: String,
    Email_Id: String,
    Mobile_Number: String
}, 'flights');

const ns = new mongoose.Schema({
    From: String,
    To: String,
    Depart_Date: String,
    Return_Date: String,
    N_Adults: Number,
    N_Child: Number,
    Travel_Class: String
  });

  const nm = new mongoose.model("travels",ns);

app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/sign_up_1.html");
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/lgng.html');
  });

  app.get('/air_img.jpg', (req, res) => {
    res.sendFile(__dirname + '/air_img.jpg');
  });

app.get('/background.png', (req, res) => {
    res.sendFile(__dirname + '/background.png');
  });


app.get("/get_home", (req, res) => {
    res.sendFile(__dirname + "/inde_1.html");
});

app.get("/index", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/style", (req, res) => {
    res.sendFile(__dirname + "/style.css");
});

app.get('/airt_1.png', (req, res) => {
    res.sendFile(__dirname + '/airt_1.png');
  });
  app.get('/kiku_1.png', (req, res) => {
    res.sendFile(__dirname + '/kiku_1.png');
  });

  app.get('/lgn.png', (req, res) => {
    res.sendFile(__dirname + '/lgn.png');
  });
  app.get('/lgng', (req, res) => {
    res.sendFile(__dirname + '/lgng.html');
  });
  
app.post('/submit', (req, res) => {
    const { fname,lname,age,email,mob } = req.body;
    const user = new User({
                    First_Name:fname,
					Last_Name:lname,
					Age:age,
					Email_Id:email,
					Mobile_Number:mob
                });
    user.save()
        .then(()=>{
            res.redirect('/lgng');
        })
        .catch((err)=>{
            console.error(err);
            res.status(500).send('Error saving data to MongoDB');
        });
});

app.post('/lg_submit', async (req, res) => {
    const { fname_l,email_l} = req.body;
    const records = await User.find({ First_Name: fname_l, Email_Id: email_l }).exec();
    const record_all = await nm.find({}).exec();

    if (fname_l==="admin" && email_l==="admin")
    {
        console.log("reached by admin");
        res.render('count_details',{
            adm_details: record_all
        });
    }
    else if (records.length>0)
    {
        console.log("User Success");
        console.log(records);
        res.redirect('/index');

    }
    else{
        res.send("Please enter the Valid Credentials...");
    }
});

app.post('/index_submit', async (req, res) => {
    // Get travel details from request body
    const { ff, ft, dd, rd, na, nc, tc } = req.body;
    let tclass="";
    if (req.body.tc==="1")
    {
        tclass="Economy Class";
    }
    else{
        tclass="Bussiness Class";
    }

  
    // Create new travel document
    const travel = new nm({
      From: ff,
      To: ft,
      Depart_Date: dd,
      Return_Date: rd,
      N_Adults: na,
      N_Child: nc,
      Travel_Class: tclass,
    });
  
    // Save travel document to database
    await travel.save();
  
    // Redirect user to confirmation page
    res.send('Booked Successfully');
  });

  app.post('/get_login', async (req, res) => {
    res.redirect("/lgng");
  });

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
