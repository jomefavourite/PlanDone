function select(name) {
  return document.querySelector(name);
}

function selectAll(name) {
  return document.querySelectorAll(name);
}

const hamburger = select('.hamburger');
const nav = select('.nav');
const navLists = selectAll('.nav__list__item a');
const features = document.querySelectorAll('.feature');

const options = {
  root: null,
  threshold: 0.3,
};

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('change');
  nav.classList.toggle('toggle-show');
  document.body.classList.toggle('overflow');
});

navLists.forEach(navList => {
  navList.addEventListener('click', () => {
    document.body.classList.remove('overflow');
  });
});

const featureObserver = new IntersectionObserver(callback, options);

features.forEach(feature => {
  featureObserver.observe(feature);
});

const notesImage = document.querySelector(img[(alt = 'create notes')]);
const gpaImage = document.querySelector(img[(alt = 'forecast CGPA')]);
const taskImage = document.querySelector(img[(alt = 'create tasks')]);
const linkImage = document.querySelector(img[(alt = 'create links')]);

notesImage.classList.add('hidden-left');
gpaImage.classList.add('hidden-left');
taskImage.classList.add('hidden-right');
linkImage.classList.add('hidden-right');

// document.querySelectorAll('.feature__img').forEach(column => {
//   if (
//     column.getAttribute('alt').includes('create notes') ||
//     column.getAttribute('alt').includes('forecast CGPA')
//   ) {
//     column.classList.add('hidden-left');
//   }
//   // if (
//   //   column.getAttribute('alt').includes('create tasks') ||
//   //   column.getAttribute('alt').includes('create links')
//   // ) {
//   //   column.classList.add('hidden-right');
//   // }
// });

const fc1 = document.querySelector('#fc1');
const fc2 = document.querySelector('#fc2');
const fc3 = document.querySelector('#fc3');
const fc4 = document.querySelector('#fc4');

fc1.classList.add('hidden-right');
fc3.classList.add('hidden-right');
fc2.classList.add('hidden-left');
fc4.classList.add('hidden-left');

// document.querySelectorAll('.feature__content').forEach(column => {
//   if (column.id === 'fc1' || column.id === 'fc3') {
//     console.log(column);
//     column.classList.add('hidden-right');
//   }
//   if (column.id === 'fc2' || column.id === 'fc4') {
//     column.classList.add('hidden-left');
//   }
// });

function callback(entries, observer) {
  const [entry] = entries;
  console.log(entry, 'entry');

  if (!entry.isIntersecting) return;

  //   get the class name of the target section that came into view
  const curSectionsName = entry.target.getAttribute('id');

  //   now target that specific section
  const curSection = document.querySelector(`#${curSectionsName}`);
  console.log(curSection);

  // remove the hidden classes (DOM traversing)
  curSection.firstElementChild.classList.remove('hidden-left');
  // console.log(curSection.firstElementChild);
  curSection.lastElementChild.classList.remove('hidden-right');
  // console.log(curSection.lastElementChild);

  observer.unobserve(entry.target);
}
