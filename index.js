const express = require('express')
const path = require('path');
const PORT = process.env.PORT || 5000
var app = express();

const { Pool } = require('pg');
var pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: true // comment out if developing locally
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  // res.render('index')
  var getUsersQuery = `SELECT * FROM Tokimon`;
  pool.query(getUsersQuery, (error,result) => {
    if (error)
      res.end(error.toString());
    var results = {'rows': result.rows};
    res.render('./index',results)  
  })
})
app.get('/tokimon',(req,res) => {
  var getUsersQuery = `SELECT * FROM Tokimon`;
  pool.query(getUsersQuery, (error,result) => {
    if (error)
      res.end(error.toString());
    var results = {'rows': result.rows};
    res.render('./tokimon',results)  
  })
})
app.get('/add', (req, res) => {
  res.render('add')
})
app.post('/added', (req,res) => {
  // console.log('post');
  // console.log(req.body);
  // console.log(req.body);
  var name = req.body.name;
  var weight = req.body.weight;
  var height = req.body.height;
  var fly = req.body.fly;
  var fight = req.body.fight;
  var fire = req.body.fire;
  var water = req.body.water;
  var electric = req.body.electric;
  var frozen = req.body.frozen;
  var total = parseFloat(fly) + parseFloat(fight) + parseFloat(fire) + parseFloat(water) + parseFloat(electric) + parseFloat(frozen);
  var trainer = req.body.trainer;
  var addTokiQuery = `INSERT INTO Tokimon (name, weight, height, fly, fight, fire, water, electric, frozen, total, trainer) VALUES ('${name}',${weight},${height},${fly},${fight},${fire},${water},${electric},${frozen},${total},'${trainer}')`
  // console.log(addTokiQuery);
  pool.query(addTokiQuery, (error,result) => {
    if (error)
      res.end(error) 
    // res.send(`Tokimon: '${name}',${weight},${height},${fly},${fight},${fire},${water},${electric},${frozen},${total},'${trainer}' has been added to the database`);
    var getUsersQuery = `SELECT * FROM Tokimon`;
    pool.query(getUsersQuery, (error,result) => {
      if (error)
       res.end(error.toString());
      var results = {'rows': result.rows};
      res.render('./index',results)  
    })
  })
});
app.get('/delete', (req, res) => {
  var getUsersQuery = `SELECT * FROM Tokimon`;
  pool.query(getUsersQuery, (error,result) => {
    if (error)
      res.end(error.toString());
    var results = {'rows': result.rows};
    res.render('./delete',results)  
  })
})
app.post('/deleted', (req,res) => {
  // console.log(req.body);
  var tokimonid = req.body.tokimonid;
  var deleteQuery = `DELETE FROM Tokimon WHERE tokimonid = '${tokimonid}'`;
  pool.query(deleteQuery, (error,result) => {
    if (error)
      res.end(error.toString());
    // res.send(`Tokimon With ID: ${tokimonid} has been deleted from the database`);
    var getUsersQuery = `SELECT * FROM Tokimon`;
    pool.query(getUsersQuery, (error,result) => {
      if (error)
       res.end(error.toString());
      var results = {'rows': result.rows};
      res.render('./index',results)  
    })
  })
});
// app.post('/deleteMultiple', (req,res) => {
//   console.log(req.body);
//   // var tokimonid = req.body.tokimonid;
//   // var deleteQuery = `DELETE FROM Tokimon WHERE tokimonid = '${tokimonid}'`;
//   // pool.query(deleteQuery, (error,result) => {
//   //   if (error)
//   //     res.end(error.toString());
//   //   res.send(`Tokimon With ID: ${tokimonid} has been deleted from the database`);
//   // })
// });

app.get('/change',(req,res) => {
  var getUsersQuery = `SELECT * FROM Tokimon`;
  pool.query(getUsersQuery, (error,result) => {
    if (error)
      res.end(error.toString());
    var results = {'rows': result.rows};
    res.render('./change',results)  
  })
});
app.post('/changed', (req,res) => {
  var tokimonid = req.body.tokimonid;
  var name = req.body.name;
  var weight = req.body.weight;
  var height = req.body.height;
  var fly = req.body.fly;
  var fight = req.body.fight;
  var fire = req.body.fire;
  var water = req.body.water;
  var electric = req.body.electric;
  var frozen = req.body.frozen;
  var total = parseFloat(fly) + parseFloat(fight) + parseFloat(fire) + parseFloat(water) + parseFloat(electric) + parseFloat(frozen);
  var trainer = req.body.trainer;
  var changeQuery = `UPDATE Tokimon SET name = '${name}', weight = ${weight}, height = ${height}, fly = ${fly}, fight = ${fight}, fire= ${fire}, water = ${water}, electric = ${electric}, frozen = ${frozen}, total = ${total}, trainer = '${trainer}' WHERE tokimonid = ${tokimonid}`;
  // console.log(changeQuery)
  pool.query(changeQuery, (error,result) => {
    if (error)
      res.end(error.toString());
    // res.send(`Tokimon With ID: ${tokimonid} has been updated in the database`);
    var getUsersQuery = `SELECT * FROM Tokimon`;
    pool.query(getUsersQuery, (error,result) => {
      if (error)
       res.end(error.toString());
      var results = {'rows': result.rows};
      res.render('./index',results)  
    })
  })
});

app.get('/tokimon/:id', (req,res) => {
  // console.log(req.params.id);
  // console.log("hello")
  // var tokimonid = req.body.tokimonid;
  var userIDQuery = `SELECT * FROM Tokimon WHERE tokimonid=${req.params.id}`;
  pool.query(userIDQuery, (error,result) => {
    if (error)
      res.end(error.toString());
    var results = {'rows': result.rows};
    res.render('./moreInfo',results) 
  })
});

app.get('/info',(req,res) => {
  var getUsersQuery = `SELECT * FROM Tokimon`;
  pool.query(getUsersQuery, (error,result) => {
    if (error)
      res.end(error.toString());
    var results = {'rows': result.rows};
    res.render('./info', results);  
  })
});

app.get('/size',(req,res) => {
  var getUsersQuery = `SELECT * FROM Tokimon`;
  pool.query(getUsersQuery, (error,result) => {
    if (error)
      res.end(error.toString());
    var results = {'rows': result.rows};
    res.render('./size', results);  
  })
});

app.get('/sort',(req,res) => {
  var getUsersQuery = `SELECT * FROM Tokimon`;
  pool.query(getUsersQuery, (error,result) => {
    if (error)
      res.end(error.toString());
    var results = {'rows': result.rows};
    res.render('./sort', results);  
  })
});

app.get('/sort/:attribute',(req,res) => {
  // console.log(req.params);
  var getUsersQuery = `SELECT * FROM Tokimon ORDER BY ${req.params.attribute} ASC`;
  pool.query(getUsersQuery, (error,result) => {
    if (error)
      res.end(error.toString());
    var results = {'rows': result.rows};
    res.render('./order', results);  
  })
});

// app.get('/type',(req,res) => {
//   var getUsersQuery = `SELECT * FROM Tokimon`;
//   pool.query(getUsersQuery, (error,result) => {
//     if (error)
//       res.end(error.toString());
//     var results = {'rows': result.rows};
//     res.render('./type', results);  
//   })
// });

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


