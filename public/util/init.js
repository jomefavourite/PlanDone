function select(name) {
  return document.querySelector(name);
}

function selectAll(name) {
  return document.querySelectorAll(name);
}

// LocalStorage functionality
function checkLocalStorage(initialValue, check) {
  const localData = localStorage.hasOwnProperty(check);
  return localData ? JSON.parse(localStorage.getItem(check)) : initialValue;
}

export {select, selectAll, checkLocalStorage};
