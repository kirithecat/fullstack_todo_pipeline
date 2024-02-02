const backendBaseURL = 'https://localhost:443'

export async function getCurrentItems() {
  const response = await fetch(`${backendBaseURL}/items`)
  //TODO create a new API function here,
  // generic utility to deal with responses in a centralised way
  //validateResponse(response)
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
