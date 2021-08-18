const express = require("express");
const app = express();

require("./db/conn");
const RestRegister = require("./models/students");

const port = process.env.PORT || 3000;

app.use(express.json());      //without this we'll get undefined

app.get("/", (req, res) => {
    res.send("hello!! whats is up guys");
})


// Create a New Student

// app.post("/",(req, res) => {              // "/students" we are getting error/ any Suggestions?
//     console.log(req.body);
//     const user = new RestRegister(req.body);   //We are Posting this using POSTMAN #Create operation

//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((e) => {
//         res.status(400).send(e);
//     })
// })

app.post("/restregisters", async(req, res) => {
    try {                                            //Same code as above just using async & await
        const user = new RestRegister(req.body); 
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (e) {
        res.status(400).send(e);
    }
    
})


//READing the data using Our OWN RESTful API
app.get("/restregisters", async(req,res) => {
    try {
        const studentsData = await RestRegister.find();   // 
        res.send(studentsData);
    } catch (e){
        res.send(e); 
    }
})

//Deleting the Data using RESTful API
app.delete("/restregisters/:id", async(req,res) => {
    try {
        const deleteStudent = await RestRegister.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deleteStudent);
    } catch (e) {
        res.status(500).send(e);
    }
})

app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
})