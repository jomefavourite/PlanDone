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
  column.classList.add('hidden-left');
});
document.querySelectorAll('.feature__content').forEach(column => {
  column.classList.add('hidden-right');
});

function callback(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //   get the class name of the target section that came into view
  const curSectionsName = entry.target.getAttribute('class');

  //   now target that specific section
  const curSection = document.querySelector(`.${curSectionsName}`);
  console.log(curSection);

  //   remove the hidden classes (DOM traversing)
  curSection.firstElementChild.classList.remove('hidden-left');
  console.log(curSection.firstElementChild);
  curSection.lastElementChild.classList.remove('hidden-right');
  console.log(curSection.lastElementChild);

  observer.unobserve(entry.target);
}
