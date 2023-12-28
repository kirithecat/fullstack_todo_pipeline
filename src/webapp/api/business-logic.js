import * as db from "./db.js";
import {reset} from "./db.js";

const delimiter = '\\(^_^)/'
const backendBaseURL = 'https://localhost:443'

export async function getCurrentItems() {
  const response = await fetch(`${backendBaseURL}/items`)
  if (response.ok) {
    const jsonResponse = await response.json()
    return jsonResponse.map(obj => obj.name)
  } else {
    // Handle the error if the request was not successful
    throw new Error(`Failed to fetch data from the backend: ${backendBaseURL}/items`);
  }
}

export async function addItem(item) {
  const body = {"item": item}
  await fetch(`${backendBaseURL}/items`, {
    method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body),
  })
}

export async function deleteItem(index) {
  const currentItems = await getCurrentItems()
  if (currentItems.length === 0) {
    console.log('There are no items in the list. Nothing to delete') //todo add early return here
  }

  reset()
  const listWithoutItem = currentItems.splice(index, 1)
  let currentItemsReadyToWrite
  listWithoutItem.length === 0 ? currentItemsReadyToWrite = "" : currentItemsReadyToWrite = currentItems.join(`${delimiter}`)

  //a bit of a hack, but remove() method actually calls write() inside
  db.remove(currentItemsReadyToWrite)
}

export async function resetToDefaultItems() {
  const response = await fetch(`${backendBaseURL}/items/reset/default`, {
    method: "POST",
  })
}

export async function resetItems() {
  const response = await fetch(`${backendBaseURL}/items/reset`, {
    method: "POST",
  })
}
