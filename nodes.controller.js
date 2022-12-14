const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);
  console.log(chalk.bgCyan("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgMagentaBright("Here is the list of notes: "));
  notes.forEach((note) => {
    console.log(chalk.bgYellow(`${note.id} ${note.title}`));
  });
}

async function removeNote(id) {
  const notes = await getNotes();

  const updatedNotes = notes.filter((n) => n.id !== id);

  await saveNotes(updatedNotes);

  console.log(chalk.bgMagentaBright(`Note with id="${id}" has been removed.`));
}

async function editNote(id, title) {
  const notes = await getNotes();

  const indexNote = notes.findIndex((n) => n.id === id);

  notes[indexNote].title = title;

  await saveNotes(notes);
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  editNote,
};
