import {getCurrentItems} from "../handlers/business-logic.js"

class todoList extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <ul id="todo-list">
        </ul>
    `;
    this.createTodoList()
  }

  async createTodoList() {
    const todos = await getCurrentItems()

    for (const todo of todos) {
      console.log(todo)
      const index = todos.indexOf(todo);
      const li = document.createElement('li');
      li.innerHTML = await this.getInnerHtmlOfTodoItem(todo, index);

      const list = document.getElementById('todo-list')
      list.appendChild(li)
      console.log(li.innerHTML)
    }
  }

  async getInnerHtmlOfTodoItem(todoItem, index) {
    return `
      <span class="todo-text">${todoItem}</span>
      <button id="delete-button-${index}" class="delete-button" name="${index}">X</button>
    `;
  }
}



customElements.define('todo-list', todoList);
