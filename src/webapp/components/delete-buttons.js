import {deleteItem} from "../handlers/business-logic.js"
import {WarningBanner} from "./warning-banner.js";
import {cleanTodoInputValue} from "./todo-add.js";

const warningBanner = new WarningBanner()

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

        const elementToDelete = document.getElementById(`delete-button-${itemIndex}`)
        elementToDelete.parentElement.remove()

        await warningBanner.renderTodoListLengthWarning()
        await cleanTodoInputValue()
      });
    }
  }
}

customElements.define('delete-buttons', DeleteButtons);
