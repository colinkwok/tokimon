const express = require('express')
// const bodyParser = require('body-parser')
const path = require('path');
// const db = require('./queries')
const PORT = process.env.PORT || 5000
var app = express();

const { Pool } = require('pg');
var pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
  // user: 'postgres',
  // host: 'localhost',
  // database: 'users',
  // password: 'root',
  // port: 5432,
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index')
})
app.get('/tokimon',(req,res) => {
  var getUsersQuery = `SELECT * FROM Tokimon`;
  pool.query(getUsersQuery, (error,result) => {
    if (error)
      res.end(error);
    var results = {'rows': result.rows};
    res.render('./tokimon',results)  
  })
})

// app.get('/test', (request, response) => {
//   pool.query('SELECT * FROM users_table;', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// })

// app.get('/search', (req,res) => {
//   pool.query('SELECT * FROM users_table;', (err, result) => {
//     if (err) {
//       return console.error('Error executing query', err.stack)
//     }
//     res.json(result.rows)
//   })
// })
// app.get('/tokimon', (req,res) => {
//   res.render('tokimon');
// })

app.post('/login', (req,res) => {
  // console.log('post');
  // console.log(req.body);
  // console.log(req.body);
  var username = req.body.user;
  var password = req.body.pwd;
  res.send(`Hello, ${username}.  You have password ${password}`);
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


