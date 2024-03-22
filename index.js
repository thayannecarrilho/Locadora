const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')
console.log(pool)
const app = express()


app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.render('home')
})

app.get('/register/insertdata', function (req, res) {
  res.render('register')
})

app.post('/register/insertdata', function (req, res) {
    const cpf = req.body.cpf
    const name = req.body.name
    const birth = req.body.birth
    const cardval = req.body.cardval    
    const celphone = req.body.celphone 
    const cep = req.body.cep
    const address = req.body.address
    const number = req.body.number
    const city = req.body.city 
    const state = req.body.state 
  
    const query = `INSERT INTO cliente (??, ??, ??, ??, ??, ??, ??,??,??,??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const data = ['cpf', 'name', 'birth', 'cardval', 'celphone', 'cep', 'address', 'number', 'city', 'state', cpf, name, birth, cardval, celphone, cep, address, number, city, state]
  
    pool.query(query, data, function (err) {
      if (err) {
        console.log(err)
      }
      res.redirect('/')       
    })
  });


  app.get('/allreserves', function (req, res) {
    const reserve = req.params.cpf
    const query = `SELECT cpf FROM cliente`
    pool.query(query, function (err, data){
      if (err) {
        console.log(err)     
    } 
      const cliente = data
      console.log(data)
      res.render('allreserves', {cliente})
    }) 
  })  


app.listen(4000)
