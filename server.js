// add express server
// create express app
// include midleware to parse json
// html routes (routes that will serve websites)
//define landing page route
// use index.html inside public folder
// note page route
// use notes.html inside public folder
//API routes
// post route to save a note
// ADD the new note to the db.json
// get route to get all notes
// put route to update a note (app.put())
// delete route to delete a note
// invoke listen function on express app
const express = require(`express`);
const path = require(`path`);

const app = express();
const PORT = 4000;

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "db/db.json")));

app.post("/api/notes", (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  //newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
