import * as handlers from './handlers/business-logic.js'
import {TodoList} from "./components/todo-list.js";
import {TodoAdd} from "./components/todo-add.js";
import {WarningBanner} from "./components/warning-banner.js";
import {DeleteButtons} from "./components/delete-buttons.js";

//this event listener is an entry point
// it will:
// 1. render the page
// 2. register other event listeners for the buttons
document.addEventListener('DOMContentLoaded', async () => {
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

async function cleanTodoInputValue() {
  const todoAdd = new TodoAdd()
  await todoAdd.cleanTodoInputValue()
}

async function putFocusIntoTodoInput() {
  const todoAdd = new TodoAdd()
  await todoAdd.putFocusIntoTodoInput()
}

async function registerEventListenerForRemoveAll() {
  const removeAllButton = document.getElementById('remove-all');
  removeAllButton.addEventListener('click', async () => {
    await resetItems()
  })
}

async function registerEventListenerForResetDefault() {
  const resetDefaultButton = document.getElementById('reset-default');
  resetDefaultButton.addEventListener('click', async () => {
    await resetDefaultItems()
  })
}

async function registerEventListenerForTodoFormSubmit() {
  let todoForm = document.getElementById('todo-form');

  todoForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await addTodo();
  });
}

async function registerEventListenersForDeleteButtons() {
  const deleteButtons = new DeleteButtons()
  await deleteButtons.registerEventListenersForDeleteButtons()
}

async function renderTodoList() {
  //TODO refactor this to remove the api calling from the class
  // const apiCallResults = makeCall()
  //TODO this should be logic inside the API call
  // if (apiCallResults not empty) {
  //   do stuff
  // }
  const todoList = new TodoList()
  await todoList.populateTodoList()
}

async function addTodo() {
  let todoInput = document.getElementById('todo-input');

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

  await handlers.addItem(todoText);
  await renderPage();
  todoInput.value = '';
}

//todo bug is here, need to find a way to re-render the page without an infinite loop
async function deleteTodo(index) {
  await handlers.deleteItem(index)
  await renderPage()
}

async function resetItems() {
  await handlers.resetItems()
  await renderPage()
}

async function resetDefaultItems() {
  await handlers.resetToDefaultItems()
  await renderPage()
}

async function renderTodoListLengthWarning() {
  const warningBanner = new WarningBanner()
  await warningBanner.renderTodoListLengthWarning()
}
