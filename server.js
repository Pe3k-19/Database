const express = require('express');
const app = express();
app.use(express.json());
const pool = require('./connection');
// const url = 'localhost';
const Joi = require('joi');




pool.getConnection()
.then(conn => {console.log('Connect')})

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


// --------------------     GET   --------------------------



app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/api', (req, res) => {
    res.send([10, 20, 30]);
});

app.get('/tasks', (req, res) =>{
    res.send(localDatabase);
});


app.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = localDatabase.find(task => task.id === id);
    if(task) {
            res.send(task);
        } else {
            res.status(404).send('Uloha sa nenasla');
        }
    
});


// --------------------     POST   --------------------------


app.post('/tasks', (req, res) => {
    const schema = {                                            //  >>>>>>>>>>>>>>>>>>>>  VALIDACIA  ------------------------
        name: Joi.string().min(3).required()                    //  >>>>>>>>>>>>>>>>>>>>  VALIDACIA  ------------------------
    };

    const result = Joi.validate(req.body, schema);              //  >>>>>>>>>>>>>>>>>>>>  VALIDACIA  ------------------------
    if(result.error) {                                          //  >>>>>>>>>>>>>>>>>>>>  VALIDACIA  ------------------------
        res.status(400).send(result.error.details[0].message);  //  >>>>>>>>>>>>>>>>>>>>  VALIDACIA  ------------------------
        return;
    }

    const task = {
    id: localDatabase.length +1,
    name: req.body.name
    };

localDatabase.push(task);
res.send(task);
});

const port = process.env.PORT || 3000;
//  Zmena v konzole set PORT=cislo portu
app.listen(port, () => console.log(`Listening on port ${port}...`));

    
      // conn.query("SELECT name FROM ulohy")
      //   .then((name) => {
      //     console.log(name); //[ {val: 1}, meta: ... ]

          // " CREATE TABLE myTable (id int, val varchar(255)) "

          // return conn.query("INSERT INTO ulohy value (?, ?)", [25, "vlozena uloha"]);
        // })

        
        // .then((res) => {
        //   console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
        //   conn.end();
        // })
    //     .catch(err => {
    //       //handle error
    //       console.log(err); 
    //       conn.end();
    //     })
        
    // }).catch(err => {
    //   console.log('DISCONNECT');
    // });

