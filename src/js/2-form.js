const form = document.querySelector('.feedback-form');

const LS_KEY = 'feedback-form-state';
const email = form.elements.email;
const message = form.elements.message;

form.addEventListener('input', handlerFormInput);
form.addEventListener('submit', handlerFormSubmit);
document.addEventListener('DOMContentLoaded', onLoadHandler);

function onLoadHandler() {
  const data = getDataFromLocalStorage(LS_KEY);
  if (!data) {
    return;
  }
  email.value = data.email;
  message.value = data.message;
}

function handlerFormInput() {
  const email = form.elements.email;
  const message = form.elements.message;
  const data = {
    email: email.value.trim(),
    message: message.value.trim(),
  };
  addDataToLocalStorage(LS_KEY, data);
}

function handlerFormSubmit(e) {
  e.preventDefault();
  if (!email.value.trim() || !message.value.trim())
    return alert('Some fields empty...');
  console.log({ email: email.value.trim(), message: message.value.trim() });
  form.reset();
  clearLocalStorage();
}

function addDataToLocalStorage(key, value) {
  try {
    const normalizedValue = JSON.stringify(value);
    localStorage.setItem(key, normalizedValue);
  } catch (error) {
    console.log(error.message);
  }
}
function getDataFromLocalStorage(key) {
  try {
    const normalizedState = localStorage.getItem(key);
    return normalizedState === null ? undefined : JSON.parse(normalizedState);
  } catch (error) {
    console.log(error.message);
  }
}

function clearLocalStorage() {
  localStorage.clear();
}
