const backendBaseURL = 'https://localhost:443'

export async function getCurrentItems() {
  const response = await fetch(`${backendBaseURL}/items`)
  await validateResponse(response)
  const responseBody = await response.json()
  //todo this requires an explanation, why can't api contract be changed to give back an array?
  return responseBody.map(obj => obj.name)
}

async function validateResponse(response) {
  if (!response.ok) {
    // Throw an error if the request was not successful
    throw new Error(`Failed to fetch data from the backend: ${response.url}`);
  }
}

export async function addItem(item) {
  const body = {"item": item}
  await fetch(`${backendBaseURL}/items`, {
    method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body),
  })
}

export async function deleteItem(index) {
  //TODO: here is the bug on the DB SQL side. id column need to be updated when removing a row.
  const response = await fetch(`${backendBaseURL}/items/${index}`, {
    method: "DELETE",
  })
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
