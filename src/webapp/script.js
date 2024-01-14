import * as handlers from './handlers/business-logic.js'

//this event listener is an entry point
// it will:
// 1. render the page
// 2. register other event listeners for the buttons
//document.addEventListener('DOMContentLoaded', async function () {
console.log("0 - script.js begins to execute, document.readyState is: ", document.readyState);

document.addEventListener('DOMContentLoaded', async (event) => {
  console.log("1 - document.readyState is: ", document.readyState);

  if (event.target.readyState === "interactive") {
    console.log('sdsdfsd')
    //initLoader();
  } else if (event.target.readyState === "complete") {
    console.log('121111')
    //initApp();
  }
  await renderPage();

  //submit form is never deleted, event listener can be registered here
  await registerEventListenerForTodoFormSubmit()
  await registerEventListenerForRemoveAll()
  await registerEventListenerForResetDefault()
});
console.log("0 - event listener is registered, document.readyState is: ", document.readyState);


async function renderPage() {
  console.log("2 - document.readyState is: ", document.readyState);
  await renderTodoList()
  console.log("3 - document.readyState is: ", document.readyState);
  await cleanTodoInputValue()
  await putFocusIntoTodoInput()
  await renderTodoListLengthWarning()

  //delete buttons are dynamic, registering event listeners each time page changes
  await registerEventListenersForDeleteButtons()
}

async function cleanTodoInputValue() {
  let todoInput = document.getElementById('todo-input');
  todoInput.value = ''
}

async function putFocusIntoTodoInput() {
  let todoInput = document.getElementById('todo-input');
  //this will not only put focus, but also visually select input element
  //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#focus_on_a_text_field
  const focusOptions = {focusVisible: "true"}
  // noinspection JSCheckFunctionSignatures
  todoInput.focus(focusOptions)
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
  let deleteButtons = document.getElementsByClassName('delete-button');

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
  let todoList = document.getElementById('todo-list');
  const todos = await handlers.getCurrentItems()

  todoList.innerHTML = '';
  for (const todo of todos) {
    const index = todos.indexOf(todo);
    const li = document.createElement('li');
    li.innerHTML = await getInnerHtmlOfTodoItem(todo, index);
    todoList.appendChild(li);
  }
}

async function getInnerHtmlOfTodoItem(todoItem, index) {
  return `
      <span class="todo-text">${todoItem}</span>
      <button id="delete-button-${index}" class="delete-button" name="${index}">X</button>
    `;
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
  const todos = await handlers.getCurrentItems() //todo fix this to use cookie value
  const banner = document.getElementById('banner');

  if (todos.length > 10) {
    banner.style.display = 'block';
  } else {
    banner.style.display = 'none';
  }
}
