const addNoteBtn = document.getElementById("addNoteBtn");
const noteInput = document.getElementById("noteInput");
const notesContainer = document.getElementById("notesContainer");


window.onload = () => {
  const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  savedNotes.forEach(noteText => createNote(noteText));
};

addNoteBtn.addEventListener("click", () => {
  const noteText = noteInput.value.trim();
  if (noteText !== "") {
    createNote(noteText);
    saveNote(noteText);
    noteInput.value = "";
  }
});

function createNote(text) {
  const note = document.createElement("div");
  note.className = "note";
  note.innerHTML = `
    ${text}
    <button onclick="deleteNote(this)">🗑</button>
  `;
  notesContainer.appendChild(note);
}

function deleteNote(button) {
  const note = button.parentElement;
  const noteText = note.textContent.replace("delete", "").trim();
  note.remove();
  removeNoteFromStorage(noteText);
}

function saveNote(noteText) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(noteText);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function removeNoteFromStorage(noteText) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.filter(note => note !== noteText);
  localStorage.setItem("notes", JSON.stringify(notes));
}