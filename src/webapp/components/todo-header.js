class TodoHeader extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<h1>Todo List</h1>`;
  }
}

customElements.define('todo-header', TodoHeader);
