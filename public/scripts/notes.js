import {select, selectAll} from "../util/init.js";

const topic = select("#topic");
const textArea = select("#textarea");
const textBox = select("#textbox");
const btnAdd = select(".button__add");
const search = select(".search");
const createNotesBtn = select(".createNotes");
const modal = select(".modal");
const closeModal = select(".closeModal");
const notesContainer = select(".notes__container");
const noteOffline = select(".note__none__offline");
const spinner = select(".spinner");

// let initialNotes = [
//   {topic: 'Demo', description: 'Hello everyone'},
//   {topic: 'Hello', description: 'Hello everyone'},
// ];

// let notes = checkLocalStorage(initialNotes, 'notes');

let notes = [];

// buildNotes(notes);

btnAdd.addEventListener("click", addNotes);
search.addEventListener("keyup", e => filterNotes(e));
createNotesBtn.addEventListener("click", () => {
  modal.classList.toggle("show");
});
closeModal.addEventListener("click", () => {
  modal.classList.toggle("show");
});
document.addEventListener("click", e => {
  if (e.target.classList.contains("delete__off")) {
    return removeNote(e.target.parentElement);
  }
});

function addNotes(e) {
  spinner.style.display = "inline-block";
  if (notesContainer.dataset.isauth === "false") {
    e.preventDefault();
    notes.push({topic: topic.value, description: textBox.value});
    // localStorage.setItem('notes', JSON.stringify(notes));
    buildNotes(notes);
  }

  // if (topic.value.length === 0 && textArea.value.length === 0) {
  //   return alert('Notes cannot be empty');
  // }
  // if (textArea.value.length === 0) {
  //   return alert('Description cannot be empty');
  // }
  // if (topic.value.length === 0) {
  //   return alert('Topic cannot be empty');
  // }

  // console.log(notesContainer.dataset.isauth);
}

function buildNotes(notes) {
  notesContainer.innerHTML = "";
  setTimeout(() => {
    topic.value = "";
    textBox.value = "";
  }, 1000);

  modal.classList.remove("show");
  // style="background-color: ${clr || color.value}"
  noteOffline.style.display = "none";

  notes.forEach(note => {
    notesContainer.innerHTML += `
    <div class="note" data-aos="fade-up">
      <h2>${note.topic}</h2>
      <pre>${note.description}</pre>

      <button class="note__delete">
        <img class="delete__off delete" src="../images/delete_icon.svg" alt="delete icon" />
      </button>
    </div>
  `;
  });
}

function removeNote(e) {
  notes = notes.filter(note => {
    let topic = e.parentElement.querySelector("h2").textContent;
    return topic !== note.topic;
  });
  buildNotes(notes);
  // localStorage.setItem('notes', JSON.stringify(notes));
}

function filterNotes(e) {
  const notes = selectAll(".note");
  const notFound = select(".notFound");

  const searching = e.target.value.toLowerCase();

  // Filters the notes
  [...notes].forEach(note => {
    const noteContent = note.firstElementChild.innerText;
    if (noteContent.toLowerCase().includes(searching)) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });

  const result = [...notes].every(note => {
    return note.style.display === "none";
  });

  result === true
    ? (notFound.style.display = "block")
    : (notFound.style.display = "none");
}

ClassicEditor.create(textArea ? textArea : "", {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "blockQuote",
    "undo",
    "redo",
  ],
}).catch(error => {
  console.error(error);
});

const deleteIcons = document.querySelectorAll(".note__delete img");

deleteIcons.forEach(deleteIcon => {
  deleteIcon.addEventListener("click", e => {
    const endpoint = `/notes/${deleteIcon.attributes[0].nodeValue}`;

    fetch(endpoint, {
      method: "DELETE",
    })
      .then(res => {
        window.location.href = "/notes";
      })
      .catch(err => console.error(err));
  });
});
