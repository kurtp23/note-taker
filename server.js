// add express server
const express = require(`express`);
const fs = require(`fs`);
const path = require(`path`);
const { nanoid } = require("nanoid");
// create express app
const app = express();
process.env.PORT;
const PORT = process.env.PORT || 4000;
// include midleware to parse json
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// html routes (routes that will serve websites)
//define landing page route
// use index.html inside public folder
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));

// note page route
// use notes.html inside public folder
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

// get route to get all notes
app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "db/db.json")));

//API routes
// post route to save a note
// ADD the new note to the db.json
app.post("/api/notes", (req, res) => {
  console.log(req.body);
  const newNote = req.body;
  newNote.id = nanoid();
  const noteFile = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
  noteFile.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(noteFile));
  res.json(newNote);
});
// put route to update a note (app.put())
// app.put("/notes", function (req, res) {});
// delete route to delete a note

app.delete("/api/notes/:id", (req, res) => {
  const noteFile = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
  const filteredNotes = noteFile.filter((note) => note.id !== req.params.id);
  fs.writeFileSync("db/db.json", JSON.stringify(filteredNotes));
  res.status(200).end();
});

// invoke listen function on express app
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
