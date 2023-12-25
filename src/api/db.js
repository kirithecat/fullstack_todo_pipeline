const db = require('better-sqlite3')('tododb', {})
db.pragma('journal_mode = WAL');

//todo do I need config for sqlite???
//config package allows you to select values based on the environment (dev/prod)
//see the ./config subfolder
const config = require('config')

const {readFileSync} = require("node:fs");
const migration = readFileSync('../db/migrations/001-initial.sql', 'utf8');

//db.exec(migration)

function getItems() {
  const rows = db.prepare('SELECT * FROM Items');
  return rows.all()
}

function getItem(id) {
  const rows = db.prepare(`SELECT *
                           FROM Items
                           WHERE id = ${id}`);
  return rows.all()[0]
}

function addItem(item) {
  const statement = db.prepare(`INSERT
                                INTO Items ("id", "name")
                                VALUES (NULL, '${item}');`)
  const {lastInsertRowid} = statement.run()
  return {
    id: lastInsertRowid
  }
}

function deleteItem(id) {
  const statement = db.prepare(`DELETE
               FROM Items 
               WHERE id = ${id}`)
  statement.run()
}

module.exports = {
  getItems,
  getItem,
  addItem,
  deleteItem
}