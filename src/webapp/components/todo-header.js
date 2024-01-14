class TodoHeader extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<div><h1>Todo List</h1></div>`;
  }
}

customElements.define('todo-header', TodoHeader);
