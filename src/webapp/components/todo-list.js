import {getCurrentItems} from "../handlers/business-logic.js"

export class TodoList extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = this.createEmptyList();
  }

  createEmptyList() {
    return `
        <ul id="todo-list">
        </ul>
    `
  }

  //TODO this method does 2 things and violates S in SOLID
  // need to refactor and pass data as parameter (and make an example learning!)
  async populateTodoList() {
    const todos = await getCurrentItems()

    const list = document.getElementById('todo-list')
    list.innerHTML = ''
    for (const todo of todos) {
      const index = todos.indexOf(todo);
      const li = document.createElement('li');
      li.innerHTML = await this.getInnerHtmlOfTodoItem(todo, index);

      list.appendChild(li)
    }

    this.innerHTML = list.innerHTML
  }

  async getInnerHtmlOfTodoItem(todoItem, index) {
    return `
      <span class="todo-text">${todoItem}</span>
      <button id="delete-button-${index}" class="delete-button" name="${index}">X</button>
    `;
  }
}

customElements.define('todo-list', TodoList);
