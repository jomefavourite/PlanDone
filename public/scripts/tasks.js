import { select, selectAll, checkLocalStorage } from "../util/init.js";

const topic = select("#topic");
const textArea = select("#textarea");
const date = select("#date");
const createTasksBtn = select(".createNotes");
const search = select(".search");
const modal = select(".modal");
const checkboxes = selectAll("#checkbox");
const btnAdd = select("#addTasks");
const deleteCheckBoxes = document.querySelectorAll('input[type="checkbox"]');
const tasksContainer = select(".tasks__container");
const taskOffline = select(".task__none__offline");
const spinner = select(".spinner");
const alertContainer = select(".alert");

// const initialTasks = [
//   {
//     topic: 'Submit my assignment before Monday',
//     description: 'Lorem ipsum dolor sit amet.',
//     date: '1/05/21',
//   },
//   {
//     topic: 'Loading',
//     description: 'Lorem ipsum dolor sit amet.',
//     date: '1/05/21',
//   },
// ];

// let tasks = checkLocalStorage(initialTasks, 'tasks');
let tasks = [];

// buildTasks(tasks);

btnAdd.addEventListener("click", addTasks);
search.addEventListener("keyup", (e) => filterNotes(e));
createTasksBtn.addEventListener("click", () => {
  modal.classList.toggle("show");
});
document.addEventListener("click", (e) => {
  if (e.target.id === "checkbox") {
    return removeTasks(e.target.parentElement);
  }
  if (e.target.classList.contains("closeAlert")) {
    alertContainer.style.display = "none";
  }
});

deleteCheckBoxes.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const endpoint = `/tasks/${checkbox.attributes[0].nodeValue}`;

    fetch(endpoint, {
      method: "DELETE",
    })
      .then((res) => {
        window.location.href = "/tasks";
      })
      .catch((err) => console.error(err));
  });
});

// const tasksContainer = selectAll('.task');

// tasksContainer.forEach((task, i) => {
//   task.addEventListener('click', e => {
//     if (e.target.innerHTML === 'Edit') {
//       console.log('hello');
//     }
//     // const editableTopic = select('h2[contenteditable="false"]');
//     // const editableText = select('.desc[contenteditable="false"]');
//     // const editableDate = select('.date[contenteditable="false"]');
//     // const saveIcon = select('.save-icon');

//     // editableText.setAttribute('contenteditable', 'true');
//     // //   editableText.addEventListener('keyup', e => {
//     // //     tasks[0].description = e.target.innerText;
//     // //   });

//     // console.log(editableText.innerText);
//   });
// });

function addTasks(e) {
  // e.preventDefault();

  // const tasksContainer = select('.tasks__container');

  topic.value && textArea.value && date.value
    ? (spinner.style.display = "inline-block")
    : null;

  if (tasksContainer.dataset.isauth === "false") {
    e.preventDefault();
    tasks.push({
      topic: topic.value,
      description: textArea.value,
      date: date.value,
    });
    // localStorage.setItem('notes', JSON.stringify(notes));
    buildTasks(tasks);
  }

  // if (topic.value.length === 0 && textArea.value.length === 0) {
  //   return alert('Tasks cannot be empty');
  // }
  // if (textArea.value.length === 0) {
  //   return alert('Description cannot be empty');
  // }
  // if (topic.value.length === 0) {
  //   return alert('Topic cannot be empty');
  // }

  // tasks.push({
  //   topic: topic.value,
  //   description: textArea.value,
  //   date: date.value,
  // });
  // localStorage.setItem('tasks', JSON.stringify(tasks));
  // buildTasks(tasks);
}

function buildTasks(tasks) {
  tasksContainer.innerHTML = "";
  setTimeout(() => {
    topic.value = "";
    textArea.value = "";
    date.value = "";
  }, 1000);
  // topic.value = '';
  // textArea.value = '';
  modal.classList.remove("show");
  taskOffline.style.display = "none";
  spinner.style.display = "none";

  tasks.forEach((task) => {
    tasksContainer.innerHTML += `
    <div class="task" data-aos="fade-up">
      <input data_id="<%= task.id %>" type="checkbox" id="checkbox" title="mark completed" />
      <div class="task__content">
        <h2>${task.topic}</h2>
        <p class="desc">${task.description}</p>
        <p class="date">
          <img src="./images/calender.svg" alt="">
          ${task.date}
        </p>
      </div>
    </div>
  `;
  });

  if (tasks.length === 1) {
    alertContainer.style.display = "block";
  }
}

function removeTasks(e) {
  tasks = tasks.filter((task) => {
    let topic = e.querySelector("h2").textContent;
    return topic !== task.topic;
  });
  buildTasks(tasks);

  // localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterNotes(e) {
  const tasks = selectAll(".task");
  const notFound = select(".notFound");
  const tasksContainer = select(".tasks__container");

  const searching = e.target.value.toLowerCase();

  // Filters the notes
  [...tasks]?.forEach((task) => {
    const taskContent = task.children[1].innerText;
    if (taskContent.toLowerCase().includes(searching)) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }

    console.log(task.children[1].firstElementChild.innerText);
  });

  const result = [...tasks].every((task) => {
    return task.style.display === "none";
  });

  if (result === true) {
    notFound.style.display = "block";
    tasksContainer.style.display = "none";
  } else {
    notFound.style.display = "none";
    tasksContainer.style.display = "grid";
  }
}
