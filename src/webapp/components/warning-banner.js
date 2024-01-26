import * as handlers from "../handlers/business-logic.js";

export class WarningBanner extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div id="banner">
        <p>Warning: Your todo list is getting long!</p>
      </div>
    `;
  }

  async renderTodoListLengthWarning() {
    const todos = await handlers.getCurrentItems() //todo fix this to use cookie value
    const banner = document.getElementById('banner');

    if (todos.length > 10) {
      banner.style.display = 'block';
    } else {
      banner.style.display = 'none';
    }
  }

}

customElements.define('warning-banner', WarningBanner);
