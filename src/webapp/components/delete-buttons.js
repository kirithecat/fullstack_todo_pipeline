import {deleteItem} from "../handlers/business-logic.js"

export class DeleteButtons extends HTMLElement {
  constructor() {
    super();
  }

  async registerEventListenersForDeleteButtons() {
    let deleteButtons = document.getElementsByClassName('delete-button');
    const deleteButtonsArray = [].slice.call(deleteButtons);
    for (const deleteButton of deleteButtonsArray) {
      deleteButton.addEventListener('click', async (event) => {
        const itemIndex = event.target.name
        await deleteItem(itemIndex)
      });
    }
  }
}

customElements.define('delete-buttons', DeleteButtons);
