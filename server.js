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
app.use(express.static('public'))

//Routes
app.get("/", function(req, res) {
    // console.log('Get Route')
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
    }); 

//Use the fs package to read our db.json file that is storing our notes
    app.get("/api/notes", function(req, res) {
        fs.readFile('db/db.json', 'utf8', function (err, data) {

            var string = JSON.stringify(data)
            var makeArray = JSON.parse(string)
            var notesDB = JSON.parse(makeArray)
            res.json(notesDB)
        })    
    });
 
    app.post("/api/notes", function(req,res) {
        fs.readFile('db/db.json', 'utf8', function (err, data) {
            var string = JSON.stringify(data)
             var makeArray = JSON.parse(string)
             var notesDB = JSON.parse(makeArray)
    

             req.body.id = notesDB.length + 1
             var newDB = notesDB.concat(req.body)
    
         fs.writeFile('db/db.json',JSON.stringify(newDB), function (err) {
             res.json(newDB);
         });
        });
     });

//Delete dunction selecting the 
app.delete('/api/notes/:id', function (req, res) {

    var deleteNote = req.params.id
    // console.log(deleteNote)
  
    fs.readFile("db/db.json", "utf8", function (err, data) {
        
        if (err) throw err
  
        var note = JSON.parse(data)
        var index = parseInt(deleteNote) - 1
        note.splice(index, 1);
  
        fs.writeFile('db/db.json', JSON.stringify(note), 'utf8', function (err) {
        if (err) throw err
        // console.log('deletedone2')
        })
    })
    res.send(deleteNote)
  })
// // Create a function for handling the requests and responses coming into our server
// function handleRequest(req, res) {

//     // Here we use the fs package to read our index.html file
//     fs.readFile(__dirname + "/index.html", function(err, data) {
//       if (err) throw err;
//       // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
//       // an html file.
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.end(data);
//     });
//   }

// Start the server
app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(`Server listening at http://localhost:${PORT}`)
    };
});


