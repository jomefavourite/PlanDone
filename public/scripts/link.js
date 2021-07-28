import {select, selectAll, checkLocalStorage} from "../util/init.js";

const urlName = select("#urlName");
const createLinkBtn = select(".createLinks");
const search = select(".search");
const modal = select(".modal");
const title = select(".title");
const btnAdd = select("#addLink");
const linksContainer = select(".links__container");
const linkOffline = select(".task__none__offline");
const spinner = select(".spinner");

// const initialLinks = [
//   {
//     title: 'RUN LMS',
//     urlname: 'https://run.nhuniversities.com.ng/login/index.php',
//   },
//   {
//     title: 'Student Portal',
//     urlname: 'http://reg.run.edu.ng/index.php',
//   },
// ];

let links = [];

btnAdd.addEventListener("click", addLinks);
search.addEventListener("keyup", e => filterLinks(e));
createLinkBtn.addEventListener("click", () => {
  modal.classList.toggle("show");
});

// buildLinks(links);

function addLinks(e) {
  title.value && urlName.value
    ? (spinner.style.display = "inline-block")
    : null;
  // if (title.value.length === 0 && urlName.value.length === 0) {
  //   return alert("Inputs cannot be empty");
  // }
  // if (title.value.length === 0) {
  //   return alert("Title cannot be empty");
  // }
  // if (urlName.value.length === 0) {
  //   return alert("The URL name cannot be empty");
  // }

  if (linksContainer.dataset.isauth === "false") {
    e.preventDefault();
    links.push({title: title.value, urlname: urlName.value});
    buildLinks(links);
  }

  // links.push({
  //   title: title.value,
  //   urlname: urlName.value,
  // });
  // localStorage.setItem('links', JSON.stringify(links));
  // buildLinks(links);
}

function buildLinks(links) {
  const linksContainer = select(".links__container");
  linksContainer.innerHTML = "";
  title.value = "";
  urlName.value = "";

  linkOffline.style.display = "none";
  spinner.style.display = "none";

  links.forEach(link => {
    linksContainer.innerHTML += `
      <div class="link">
        <a href=${link.urlname} data-aos="fade-up">
          <div>
            <img src="../images/www.svg" alt="world wide web" />
            <h5>${link.title}</h5>
          </div>
        </a>

        <button class="link__delete">
          <img
            data_id="<%= link.id %>"
            class="delete"
            src="../images/delete_icon.svg"
            alt="delete icon"
          />
        </button>
      </div>
    `;
  });
}

function filterLinks(e) {
  const links = selectAll(".link");
  const notFound = select(".notFound");

  const searching = e.target.value.toLowerCase();

  // Filters the links
  [...links].forEach(link => {
    console.log(link);
    const linkContent = link.lastElementChild.innerText;
    if (linkContent.toLowerCase().includes(searching)) {
      link.style.display = "block";
    } else {
      link.style.display = "none";
    }
  });

  const result = [...links].every(link => {
    return link.style.display === "none";
  });

  result === true
    ? (notFound.style.display = "block")
    : (notFound.style.display = "none");
}

const deleteIcons = document.querySelectorAll(".link__delete img");

deleteIcons.forEach(deleteIcon => {
  deleteIcon.addEventListener("click", e => {
    const endpoint = `/links/${deleteIcon.attributes[0].nodeValue}`;

    fetch(endpoint, {
      method: "DELETE",
    })
      .then(res => {
        window.location.href = "/links";
      })
      .catch(err => console.error(err));
  });
});
