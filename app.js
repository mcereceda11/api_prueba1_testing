const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const users = require('./api/routes/users')
const cursos = require('./api/routes/cursos')
const notas = require('./api/routes/notas')

app.use(cors())
app.options('*', cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', users)
app.use('/cursos', cursos)
app.use('/notas', notas)

app.listen(port, () => {
  console.log(`Api Testing Prueba 1 => http://localhost:${port}`)
})