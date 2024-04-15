import better_sqlite3 from "better-sqlite3";
const db = better_sqlite3('tododb', {verbose: console.log})
db.pragma('journal_mode = WAL');

//todo do I need config for sqlite???
//config package allows you to select values based on the environment (dev/prod)
//see the ./config subfolder
import config from "config";

import {readFileSync} from "node:fs";
//todo do I need this?
//possibly need to move into a separate file with the readme for the initial DB creation
const migration = readFileSync('../db/migrations/001-initial.sql', 'utf8');

//db.exec(migration)

export function getItems() {
  const rows = db.prepare('SELECT * FROM Items');
  return rows.all()
}

export function getItem(id) {
  const rows = db.prepare(`SELECT *
                           FROM Items
                           WHERE id = ${id}`);
  return rows.all()[0]
}

export function addItem(item) {
  const statement = db.prepare(`INSERT
                                INTO Items ("id", "name")
                                VALUES (NULL, '${item}');`)
  const {lastInsertRowid} = statement.run()
  return {
    id: lastInsertRowid
  }
}

export function deleteItem(id) {
  const deleteItem = db.prepare(`DELETE
                                FROM Items
                                WHERE id = ${id} + 1; --incremented to match the 1-based indexing of sql vs 0-based in DOM`)
  const makeIdsSequential = db.prepare(`
      UPDATE Items
      SET id = id - 1
      WHERE id > ${id};
  `)

  const transaction = db.transaction(() => {
    deleteItem.run()
    makeIdsSequential.run()
  });
  transaction()
}

export function updateItem(id, name) {
  const statement = db.prepare(`UPDATE Items
                                SET name = '${name}'
                                WHERE id = ${id};
  `)
  statement.run()
}

export function resetItems() {
  const statement = db.prepare(`DELETE
                                FROM Items`)
  statement.run()
}

export function resetDefaultItems() {
  const statement = db.prepare(`INSERT
                                INTO Items ("id", "name")
                                VALUES (NULL, 'Buy Milk'),
                                       (NULL, 'Relax'),
                                       (NULL, 'Complete all tasks')
  `)
  statement.run()
}
