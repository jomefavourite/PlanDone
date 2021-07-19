import {select, selectAll} from '../util/init.js';

const topic = select('#topic');
const textArea = select('#textarea');
const btnAdd = select('.button__add');
const search = select('.search');
const createNotesBtn = select('.createNotes');
const modal = select('.modal');
const closeModal = select('.closeModal');

// let initialNotes = [
//   {topic: 'Demo', description: 'Hello everyone'},
//   {topic: 'Hello', description: 'Hello everyone'},
// ];

// let notes = checkLocalStorage(initialNotes, 'notes');

let notes = [];

// buildNotes(notes);

btnAdd.addEventListener('click', addNotes);
search.addEventListener('keyup', e => filterNotes(e));
createNotesBtn.addEventListener('click', () => {
  modal.classList.toggle('show');
});
closeModal.addEventListener('click', () => {
  modal.classList.toggle('show');
});
// document.addEventListener('click', e => {
//   if (e.target.classList.value === 'delete') {
//     return removeNote(e.target.parentElement);
//   }
// });

function addNotes(e) {
  const notesContainer = select('.notes__container');

  if (notesContainer.dataset.isauth === 'false') {
    e.preventDefault();
    notes.push({topic: topic.value, description: textArea.value});
    // localStorage.setItem('notes', JSON.stringify(notes));
    buildNotes(notes);
  }

  if (topic.value.length === 0 && textArea.value.length === 0) {
    return alert('Notes cannot be empty');
  }
  if (textArea.value.length === 0) {
    return alert('Description cannot be empty');
  }
  if (topic.value.length === 0) {
    return alert('Topic cannot be empty');
  }
}

function buildNotes(notes) {
  const notesContainer = select('.notes__container');

  console.log(notesContainer.dataset.isAuth);
  // notesContainer.innerHTML = '';
  // setTimeout(() => {
  //   topic.value = '';
  //   textArea.value = '';
  // }, 1000);
  // style="background-color: ${clr || color.value}"
  notes.forEach(note => {
    notesContainer.innerHTML += `
    <div class="note" data-aos="fade-up">
      <h2>${note.topic}</h2>
      <pre>${note.description}</pre>

      <button class="note__delete">
        <img class="delete" src="../images/delete_icon.svg" alt="delete icon" />
      </button>
    </div>
  `;
  });
}

// function removeNote(e) {
//   notes = notes.filter(note => {
//     let topic = e.parentElement.querySelector('h2').textContent;
//     return topic !== note.topic;
//   });
//   buildNotes(notes);
//   localStorage.setItem('notes', JSON.stringify(notes));
// }

function filterNotes(e) {
  const notes = selectAll('.note');
  const notFound = select('.notFound');

  const searching = e.target.value.toLowerCase();

  // Filters the notes
  [...notes].forEach(note => {
    const noteContent = note.firstElementChild.innerText;
    if (noteContent.toLowerCase().includes(searching)) {
      note.style.display = 'block';
    } else {
      note.style.display = 'none';
    }
  });

  const result = [...notes].every(note => {
    return note.style.display === 'none';
  });

  result === true
    ? (notFound.style.display = 'block')
    : (notFound.style.display = 'none');
}
