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
        console.log("adding an event listerner for a X button")
        const itemIndex = event.target.name
        await deleteItem(itemIndex)

        const elementToDelete = document.getElementById(`delete-button-${itemIndex}`)
        elementToDelete.parentElement.remove()
      });
    }
  }
}

customElements.define('delete-buttons', DeleteButtons);
