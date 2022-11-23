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

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgCyan("Note was added!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
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

  console.log(
    chalk.bgMagentaBright("Here is the list of notes after remove: ")
  );
  updatedNotes.forEach((note) => {
    console.log(chalk.bgYellow(note.title));
  });
  await fs.writeFile(notesPath, JSON.stringify(updatedNotes));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
};
