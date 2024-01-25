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
    console.log('ccccccccccc')
    console.log(list.innerHTML)


    console.log('bbbbbbbbbbbbbbbbbbb')
    console.log(this.innerHTML)
    this.innerHTML = list.innerHTML
    console.log(this.innerHTML)


  }

  async getInnerHtmlOfTodoItem(todoItem, index) {
    return `
      <span class="todo-text">${todoItem}</span>
      <button id="delete-button-${index}" class="delete-button" name="${index}">X</button>
    `;
  }
}

customElements.define('todo-list', TodoList);
