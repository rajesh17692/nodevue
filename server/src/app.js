console.log('fdsf')
const exprss = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = exprss()
app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())

app.listen(process.env.PORT || 8081)
