const express = require('express');
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended : false }));
const pool = require('./connection');
const Joi = require('joi');
const dotenv = require('dotenv');
const { response } = require('express');
dotenv.config();
const port = process.env.PORT || 3000;

const localDatabase = [
    {id: 1,
    name: 'Upratat izbu'},
    {id: 2,
    name: 'Vycistit stenu'},
    {id: 3,
    name: 'pozametat'},
    {id: 4,
    name: 'opravit mixer'}
]


pool.getConnection()
    .then(conn => {
    
      conn.query("SELECT * FROM ulohy")
        .then((res) => {
          console.log(res);
        //   app.get("/push", (req, res) => {
        //     res.send(data);
          //Table must have been created before 
          // " CREATE TABLE myTable (id int, val varchar(255)) "
          return conn.query("INSERT INTO ulohy value (?, ?)", [res.length + 1, "nova uloha"]);

    // });
        })
        // .then((res) => {
        //   console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        //   conn.end();
        // })

        
        .catch(err => {
          //handle error
          console.log(err); 
          conn.end();
        })
        
    }).catch(err => {
        console.log('Not connect')
    });












// --------------------     GET   --------------------------


app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/tasks', (req, res) =>{
    res.send(localDatabase);
});

app.get('/tasks/:id', (req, res) => {
    const task = localDatabase.find(task => task.id === parseInt(req.params.id));
    if(!task) return res.status(404).send('Uloha sa nenasla')
    res.send(task);
});
// --------------------------------------------------------
// app.get('/getAll', (req, res) => {
//     const db = DbService.getDbServiceInstance();

//     const result = db.getAllData();

//     result
//     .then(data => response.json({data : data}))
//     .then(err => console.log(err));
// })


// --------------------     POST   --------------------------


app.post('/tasks', (req, res) => {
    const { error } = validateTask(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const task = {
    id: localDatabase.length +1,
    name: req.body.name
    };

localDatabase.push(task);
res.send(task);
});

// ---------------------------------------------------------
// app.post('/insert', (req, res) => {

// })

// ------------------------  PUT  ----------------------------

app.put('/tasks/:id', (req, res) => {
    const task = localDatabase.find(task => task.id === parseInt(req.params.id));
    if(!task) return res.status(404).send('Uloha sa nenasla')

    
    const { error } = validateTask(req.body);
    if(error) return res.status(400).send(error.details[0].message);  

    task.name = req.body.name;
    res.send(task);
});

// ------------------------  DELETE  ----------------------------

app.delete('/tasks/:id', (req, res) => {
    const task = localDatabase.find(task => task.id === parseInt(req.params.id));
    if(!task) return res.status(404).send('Uloha sa nenasla');

    const index = localDatabase.indexOf(task);
    localDatabase.splice(index, 1);

    res.send(task);
});

//  -----------------------  VALIDACIA  ------------------------


function validateTask(task) {                                 
    const schema = {                                           
        name: Joi.string().min(3).required()            
    };

    return Joi.validate(task, schema); 
}




// app.query("SELECT * FROM ulohy")
// .then((name) => {
//   res.send(name)

//   " CREATE TABLE myTable (id int, val varchar(255)) "

//   return conn.query("INSERT INTO ulohy value (?, ?)", [25, "vlozena uloha"]);
// })

// .then((res) => {
//   console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
//   conn.end();
// })
// .catch(err => {
//   //handle error
//   console.log(err); 
//   conn.end();

// }).catch(err => {
// console.log('DISCONNECT');
// })








app.listen(port, () => console.log(`Listening on port ${port}...`));

