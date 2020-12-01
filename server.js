const express = require("express");
const path = require("path");
const fs = require('fs');

//Express Instance
const app = express();

// Variable Port
const PORT = process.env.PORT || 8080;


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/", function(req, res) {
    console.log('Get Route')
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
    }); 

// Start the server
app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Server listening at http://localhost:${PORT}`)
    };
});


