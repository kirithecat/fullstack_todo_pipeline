import {deleteItem} from "../handlers/business-logic.js"

export class Buttons extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
        <button type="reset" id="remove-all">Remove all tasks</button>
        <button type="button" id="reset-default">Reset all tasks (default)</button>
    `;
  }
}

//todo this should be a separate file
export class DeleteButtons extends HTMLElement {
  constructor() {
    super();
  }

  async registerEventListenersForDeleteButtons() {
    let deleteButtons = document.getElementsByClassName('delete-button');
    const deleteButtonsArray = [].slice.call(deleteButtons);
    console.log('aaa')
    for (const deleteButton of deleteButtonsArray) {
      console.log('bbb')
      deleteButton.addEventListener('click', async (event) => {
        const itemIndex = event.target.name
        await deleteItem(itemIndex)
      });
    }
  }
}

customElements.define('todo-buttons', Buttons);
customElements.define('delete-buttons', DeleteButtons);
