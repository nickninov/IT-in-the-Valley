// HTTP requests
const express = require('express');
const app = express();

// POST, PUT or PATCH HTTP requests - contains more information about the body
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Constants for database connection
const mongoose = require('mongoose');
const db = mongoose.connection;

// Set up default port
const port = process.env.PORT || 3000;

// Create a schema for the input data
var userDataSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    type: {
        type: String
    },
    issue: {
        type: String
    },
    size: {
        type: String
    },
    page: {
        type: String
    },
    image: {
        type: String
    },
    text: {
        type: String
    }
});

// Create a schema for the personal data
var personalDataSchema = new mongoose.Schema({
    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String
    }
});

// Create a model for the Marketing Department that stores their data
var DataInput = mongoose.model("MarketDepartmentData", userDataSchema);

// Create a model for the Editing Department that stores their data
var EditingData = mongoose.model("EditingDepartmentData", userDataSchema);

// Create a model for the personal data for Editing Department
var EmailData = mongoose.model("PersonalData", personalDataSchema);

// Connect to database 
mongoose.connect('mongodb://localhost:27017/data', {
    useNewUrlParser: true,
    useUnifiedTopology: true})
.then(() => {
        console.log('Successfully connected to MongoDB')
    },
).catch((err => {
        console.log("Error: "+err);
}));

// POST data to Marketing Department
app.post("/addMagazine", (req, res) => {
    
    // Create a new Schema that will be saved in the database
    var myData = new DataInput(req.body);

    // Output the data in the console - testing
    console.log(req.body);

    // Add user to MongoDB
    myData.save()
    .then(item => {
        res.send("Saved to Database");
        console.log("Done")
    })
    .catch(err => {
        res.status(400).send("Unable to save. Error: "+err);
    });
});

// GET all data for Marketing Department
app.get('/data', (req, res) => {
    DataInput.find().then(doc => {
        res.send(doc);
    })
});

// Delete all data for Marketing Department
app.get('/deleteUsers', (req, res) => {
    DataInput.deleteMany({}, (err) => {
        if(!err) {
            res.send("Successful delete!");
        }
    })
});

// Delete all data for Editing Department
app.get('/deleteEditingDepartment', (req, res) => {
    EditingData.deleteMany({}, (err) => {
        if(!err) {
            res.send("Successful delete!");
        }
    })
});

// GET particular user ID
app.get('/data/:id', (req, res) => {

    // Search for the id in the database and return the object
    DataInput.findById(req.params.id)
    .then(doc => {

        // Check if object exists
        if(!doc) {
            res.status(404).end();
        }
        else {
            res.send(doc);
        }
        
    })
    .catch(err => res.send(err));
});


// Delete particular ID from Marketing Department
app.delete('/data/delete/:id', (req, res) => {

    // Search for the id in the database and remove the object
    DataInput.findOneAndRemove({_id: req.params.id}, (err) => {

        // Check for errors
        if(err) {
            console.log(err);
            return res.status(500).send();
        }

        return res.status(200).send("Successfully deleted "+req.params.id);
    })
});

// POST data to Editing Department
app.post("/addEditingDepartment", (req, res) => {
    
    // Create a new Schema that will be saved in the database
    var myData = new EditingData(req.body);

    // Add user to MongoDB
    myData.save()
    .then(item => {
        res.send("Saved to Database");
    })
    .catch(err => {
        res.status(400).send("Unable to save. Error: "+err);
    });
});

// GET all data for Editing Department
app.get('/EditingData', (req, res) => {
    EditingData.find().then(doc => {
        res.send(doc);
    })
});

// GET specific data for Editing Department user
app.get('/EditingData/Journals/:id/:text', (req, res) => {
    EditingData.findOneAndUpdate({_id: req.params.id}, {text: req.params.text}, (err, doc) => {
        if(err){
            return res.send(500);
        }
        else{
            return res.send("successfully edited!");
        }
    })
});

// Edit specific data for Editing Department user - Photographer
app.get('/EditingData/Photographer/:id/:text', (req, res) => {
    EditingData.findOneAndUpdate({_id: req.params.id}, {text: req.params.text}, (err, doc) => {
        if(err){
            return res.send(500);
        }
        else{
            return res.send("successfully edited!");
        }
    })
});

// Edit specific data for Editing Department user - Advertiser
app.get('/EditingData/Advertiser/:id/:page/:issue/:size', (req, res) => {
    EditingData.findOneAndUpdate({_id: req.params.id}, 
        {
            page: req.params.page,
            issue: req.params.issue,
            size: req.params.size

        }, (err, doc) => {
        if(err){
            return res.send(500);
        }
        else{
            return res.send("successfully edited!");
        }
    })
});

// POST data to Editing Department
app.post("/addPersonalData", (req, res) => {
    
    // Create a new Schema that will be saved in the database
    var myData = new EmailData(req.body);

    // Create a variable to check the email
    var validator = require("email-validator");

    // Checks if the email has a valid format
    if(validator.validate(myData.email) == true) {

        // Check if email already exists
        EmailData.findOne({
            email: myData.email
        }).then(doc => {

            // If email does not exist save it to the database
            if(doc == null){
                
                // Save to database
                myData.save().then(item => {

                    // Send ok status if data has been successfully saved
                    res.sendStatus(200);

                }).catch(err => {

                    // Send internal error if message has not been sent
                    res.sendStatus(500);

                });
            }
            // If email exists
            else {
                res.sendStatus(200)
            }
        })
    }
    else {
        res.sendStatus(500)
    }
});

// GET all data for Personal Data
app.get('/PersonalData', (req, res) => {
    EmailData.find().then(doc => {
        res.send(doc);
    })
});

// Delete all data for Personal Data
app.get('/deletePersonalData', (req, res) => {
    EmailData.deleteMany({}, (err) => {
        if(!err) {
            res.send("Successful delete!");
        }
    })
});


// Start listening for calls on 
app.listen(port, () => {
    console.log('Running on port '+port);
});