const express = require('express')
const app = express()
const port = 3000

app.get('/items/', (req, res) => {
  res.send('here is your list of items!')
})

app.post('/items/', (req, res) => {
  res.send('added an item!')
})

app.get('/items/:index', (req, res) => {
  res.send(`here is your item with ${req.params.index} index`)
})

app.delete('/items/:index', (req, res) => {
  res.send(`deleted an item with an ${req.params.index} index`)
})

app.patch('/items/:index', (req, res) => {
  res.send(`updated an item with an ${req.params.index} index`)
})

app.post('/items/reset/default', (req, res) => {
  res.send('reseted items to default list!')
})

app.post('/items/reset', (req, res) => {
  res.send('reseted items!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})