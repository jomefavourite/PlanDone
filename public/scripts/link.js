import { select, selectAll, checkLocalStorage } from "../util/init.js";

const urlName = select("#urlName");
const createLinkBtn = select(".createLinks");
const search = select(".search");
const modal = select(".modal");
const title = select(".title");
const btnAdd = select("#addLink");
const linksContainer = select(".links__container");
const linkOffline = select(".task__none__offline");
const spinner = select(".spinner");
const alertContainer = select(".alert");

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
search.addEventListener("keyup", (e) => filterLinks(e));
createLinkBtn.addEventListener("click", () => {
  modal.classList.toggle("show");
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete__off")) {
    return removeLink(e.target.parentElement.parentElement);
  }
  if (e.target.classList.contains("closeAlert")) {
    alertContainer.style.display = "none";
  }
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
    links.push({ title: title.value, urlname: urlName.value });
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

  links.forEach((link) => {
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
            class="delete__off"
            src="../images/delete_icon.svg"
            alt="delete icon"
          />
        </button>
      </div>
    `;
  });

  if (links.length === 1) {
    alertContainer.style.display = "block";
  }
}

function removeLink(e) {
  links = links.filter((link) => {
    let linkName = e.querySelector("h5").textContent;
    return linkName !== link.title;
  });
  buildLinks(links);
}

function filterLinks(e) {
  const links = selectAll(".link");
  const notFound = select(".notFound");
  const linksContainer = select(".links__container");

  const searching = e.target.value.toLowerCase();

  // Filters the links
  [...links].forEach((link) => {
    console.log(link);
    const linkContent = link.lastElementChild.innerText;
    if (linkContent.toLowerCase().includes(searching)) {
      link.style.display = "block";
    } else {
      link.style.display = "none";
    }
  });

  const result = [...links].every((link) => {
    return link.style.display === "none";
  });

  if (result === true) {
    notFound.style.display = "block";
    linksContainer.style.display = "none";
  } else {
    notFound.style.display = "none";
    linksContainer.style.display = "grid";
  }
}

const deleteIcons = document.querySelectorAll(".link__delete img");

deleteIcons.forEach((deleteIcon) => {
  deleteIcon.addEventListener("click", (e) => {
    const endpoint = `/links/${deleteIcon.attributes[0].nodeValue}`;

    fetch(endpoint, {
      method: "DELETE",
    })
      .then((res) => {
        window.location.href = "/links";
      })
      .catch((err) => console.error(err));
  });
});
