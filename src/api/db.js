const db = require('better-sqlite3')('tododb', {})//todo do I need it for sqlite???
//config package allows you to select values based on the environment (dev/prod)
//see the ./config subfolder
const config = require('config')


function getItems() {
  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  console.log(row.firstName, row.lastName, row.email);
}

module.exports = {
  getItems: getItems
}