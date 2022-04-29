const express = require('express')
const app = express()
const port = 3000

const countries = require("./routers/countries")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Travel Wishlist')
  })

app.use('/api/countries', countries)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})