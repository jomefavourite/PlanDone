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

document.querySelectorAll('.feature__img').forEach(column => {
  if (
    column.getAttribute('alt').includes('create notes') ||
    column.getAttribute('alt').includes('forecast CGPA')
  ) {
    column.classList.add('hidden-left');
  } else {
    column.classList.add('hidden-right');
  }
});

document.querySelectorAll('.feature__content').forEach(column => {
  if (column.id === 'fc1' || column.id === 'fc3') {
    console.log(column);
    column.classList.add('hidden-right');
  } else {
    column.classList.add('hidden-left');
  }
});

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
