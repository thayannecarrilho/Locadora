const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')
console.log(pool)
const app = express()
const moment = require('moment')


app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  helpers: {
    formatDate: (date) => {
      return moment(date).format("DD/MM/YYYY")
    }
  }  
}))

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

app.get('/makereserve', function (req, res) {
  res.render('makereserve')
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

  app.post('/makereserve/insert', function (req, res) {
    const cpf = req.body.cpf
    const veiculo = req.body.veiculo
    const placa = req.body.placa
    const localretirada = req.body.localretirada    
    const dataretirada = req.body.dataretirada
    const horaretirada = req.body.horaretirada
    const localdevolucao = req.body.localdevolucao
    const datadevolucao = req.body.datadevolucao
    const horadevolucao = req.body.horadevolucao
    
  
    const query = `INSERT INTO reserva (??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const data = ['cpf', 'veiculo', 'placa', 'localretirada', 'dataretirada', 'horaretirada', 'localdevolucao', 'datadevolucao', 'horadevolucao', cpf, veiculo, placa, localretirada, dataretirada, horaretirada, localdevolucao, datadevolucao, horadevolucao]
  
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

  app.get('/allreserves/:cpf', function (req, res) {
    const cpf = req.params.cpf    
    const query = `SELECT id, name, cardval, celphone, veiculo, placa, localretirada, dataretirada, horaretirada, localdevolucao, datadevolucao, horadevolucao FROM reserva INNER JOIN cliente ON cliente.cpf = reserva.cpf WHERE reserva.cpf = ${cpf}`
    pool.query(query, function (error, data) {
      if (error) {
        console.log(error)
      }      
      const reserva = data   
      res.render('reserve', {reserva})
    })    
})

//FALTA EDITAR E REMOVER





app.listen(4000)