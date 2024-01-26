export class TodoAdd extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <form id="todo-form">
          <input type="text" id="todo-input" placeholder="Add a new task...">
          <button type="submit" id="todo-submit">Add</button>
      </form>
    `;
    this.putFocusIntoTodoInput()
  }


  putFocusIntoTodoInput() {
    let todoInput = document.getElementById('todo-input');
    //this will not only put focus, but also visually select input element
    //https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#focus_on_a_text_field
    const focusOptions = {focusVisible: "true"}
    // noinspection JSCheckFunctionSignatures
    todoInput.focus(focusOptions)
  }

  cleanTodoInputValue() {
    let todoInput = document.getElementById('todo-input');
    todoInput.value = ''
  }
}

customElements.define('todo-add', TodoAdd);
