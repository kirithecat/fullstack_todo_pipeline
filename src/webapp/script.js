import * as api from './api/business-logic.js'

let todoForm = document.getElementById('todo-form');
let todoInput = document.getElementById('todo-input');
let todoList = document.getElementById('todo-list');
let deleteButtons = document.getElementsByClassName('delete-button');

//this event listener is an entry point
// it will:
// 1. render the page
// 2. register other event listeners for the buttons
document.addEventListener('DOMContentLoaded', async function () {
  await renderPage();

  //submit form is never deleted, event listener can be registered here
  await registerEventListenerForTodoFormSubmit()
  await registerEventListenerForRemoveAll()
  await registerEventListenerForResetDefault()
});

async function renderPage() {
  await renderTodoList()
  await cleanTodoInputValue()
  await putFocusIntoTodoInput()
  await renderTodoListLengthWarning()

  //delete buttons are dynamic, registering event listeners each time page changes
  await registerEventListenersForDeleteButtons()
}

function cleanTodoInputValue() {
  todoInput.value = ''
}

function putFocusIntoTodoInput() {
  //this will not only put focus, but also visually select input element
  //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#focus_on_a_text_field
  const focusOptions = {focusVisible: "true"}
  // noinspection JSCheckFunctionSignatures
  todoInput.focus(focusOptions)
}

function registerEventListenerForRemoveAll() {
  const removeAllButton = document.getElementById('remove-all');
  removeAllButton.addEventListener('click', async () => {
    await resetItems()
  })
}

function registerEventListenerForResetDefault() {
  const resetDefaultButton = document.getElementById('reset-default');
  resetDefaultButton.addEventListener('click', async () => {
    await resetDefaultItems()
  })
}

function registerEventListenerForTodoFormSubmit() {
  todoForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await addTodo();
  });
}

function registerEventListenersForDeleteButtons() {
  deleteButtons = document.getElementsByClassName('delete-button');
  const deleteButtonsArray = [].slice.call(deleteButtons);

  for (const deleteButton of deleteButtonsArray) {
    deleteButton.addEventListener('click', async (event) => {
      const itemIndex = event.target.name
      await deleteTodo(itemIndex)
    });
  }
}

async function renderTodoList() {
  const todos = await api.getCurrentItems()

  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.innerHTML = getInnerHtmlOfTodoItem(todo, index);
    todoList.appendChild(li);
  });
}

function getInnerHtmlOfTodoItem(todoItem, index) {
  return `
      <span class="todo-text">${todoItem}</span>
      <button id="delete-button-${index}" class="delete-button" name="${index}">X</button>
    `;
}

async function addTodo() {
  const todoText = todoInput.value.trim();

  if (todoInput.value.length === 0) {
    console.log('User did not enter anything')
  }

  if (todoText !== todoInput.value) {
    console.log('Todo input value has been trimmed')
  }

  if (todoText.length === 0) {
    await renderPage()
    return
  }

  await api.addItem(todoText);
  await renderPage();
  todoInput.value = '';
}

async function deleteTodo(index) {
  await api.deleteItem(index)
  await renderPage()
}

async function resetItems() {
  await api.resetItems()
  await renderPage()
}

async function resetDefaultItems() {
  await api.resetToDefaultItems()
  await renderPage()
}

async function renderTodoListLengthWarning() {
  const todos = await api.getCurrentItems() //todo fix this to use cookie value
  const banner = document.getElementById('banner');

  if (todos.length > 10) {
    banner.style.display = 'block';
  } else {
    banner.style.display = 'none';
  }
}
