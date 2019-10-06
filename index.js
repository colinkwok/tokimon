const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const db = require('./queries')
const PORT = process.env.PORT || 5000
var app = express();


app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index'))
app.get('/test', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.get('/users', db.getUsers)




app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


