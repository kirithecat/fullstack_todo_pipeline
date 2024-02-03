export class Buttons extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <button type="reset" id="remove-all">Remove all tasks</button>
        <button type="button" id="reset-default">Reset all tasks (default)</button>
    `;
  }
}

customElements.define('todo-buttons', Buttons);
