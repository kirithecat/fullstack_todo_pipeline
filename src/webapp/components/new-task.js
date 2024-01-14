class newTask extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <form id="todo-form">
          <input type="text" id="todo-input" placeholder="Add a new task...">
          <button type="submit" id="todo-submit">Add</button>
      </form>
    `;
  }
}

customElements.define('new-task', newTask);
