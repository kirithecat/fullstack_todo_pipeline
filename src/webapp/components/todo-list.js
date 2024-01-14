class todoList extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <ul id="todo-list">
        </ul>
    `;
  }
}

customElements.define('todo-list', todoList);
