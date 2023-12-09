const mysql = require('mysql2')
const config = require('config')

function getItems() {
  const dbConfig = config.get('mysql')
  const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.dbname
  })

  connection.connect()

  connection.query('SELECT * FROM items', (err, rows, fields) => {
    if (err) throw err

    console.log('The solution is: ', rows[0].Item)
  })

  connection.end()
}

module.exports = {
  getItems: getItems
}