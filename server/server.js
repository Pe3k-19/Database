const express = require("express");
const app = express();
app.use(express.json());
const pool = require('./connection');
const Joi = require('joi');
require('dotenv').config();
const port = process.env.PORT || 3000;
const birds = require('../client/index')
app.use('/birds', birds);

const localDatabase = [
    {
        id: 1,
        name: 'Upratat izbu'
    },
    {
        id: 2,
        name: 'Vycistit stenu'
    },
    {
        id: 3,
        name: 'pozametat'
    },
    {
        id: 4,
        name: 'opravit mixer'
    }
]

const addNewTask = (text) => {
    pool.getConnection()
        .then(conn => {
            conn.query("SELECT * FROM ulohy")
                .then((req, res) => {
                    conn.query("INSERT INTO ulohy VALUE (?,?)", [req.length, text]);
                    console.log(req.length, text)  // kontrola v konzole
                })
        })
}

const getTask = () => {
    pool.getConnection()
        .then(conn => {
            conn.query("SELECT * FROM ulohy")
                .then((req, res) => {
                    if (req) {
                        console.log(req);
                    } else {
                        console.log('Fail');
                    }
                })
        })
}

const updateTask = (id, text) => {
    pool.getConnection()
        .then(conn => {
        conn.query(`UPDATE ulohy SET name = '${text}' WHERE id = ${id}`)
        })
}

const deleteTask = (id) => {
    pool.getConnection()
    .then(conn => {
        conn.query(`DELETE FROM ulohy WHERE id = ${id}`)
    })
}



// pool.getConnection()
//     .then(conn => {

//       conn.query("SELECT * FROM ulohy")
//         .then((resolve, reject) => {
//             if(resolve) {
//                 console.log(resolve);
//             }
//             else {
//           console.log(reject);
//             }
//         })


//Table must have been created before 
// " CREATE TABLE myTable (id int, val varchar(255)) "
//   return conn.query("INSERT INTO ulohy value (?, ?)", [resolve.length + 1, "nova uloha"]);
// });
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
//     console.log('Not connect')
// });

// app.get('/', function (req, res) {
//     res.send(res);
// })
//     app.route('/book')
//   .get(function (req, res) {
//     res.send('Get a random book')
//   })
//   .post(function (req, res) {
//     res.send('Add a book')
//   })
//   .put(function (req, res) {
//     res.send('Update the book')
//   })

// --------------------     GET   --------------------------

getTask();


// app.get('/', (req, res) => {
//     res.send('Hello world!');
// });

// app.get('/tasks', (req, res) => {
//     res.send(localDatabase);
// });

// app.get('/tasks/:id', (req, res) => {
//     const task = localDatabase.find(task => task.id === parseInt(req.params.id));
//     if (!task) return res.status(404).send('Uloha sa nenasla')
//     res.send(task);
// });
// --------------------------------------------------------

// app.get('/rows',  function(req, res) {
//     pool.getConnection();
//     pool.query("SELECT * FROM ulohy", function (err, rows, fields) {
//         pool.end();
//         if(err) throw err;
//             res.json(rows);

//     });
//     })

//     const result = db.getAllData();

//     result
//     .then(data => response.json({data : data}))
//     .then(err => console.log(err));
// })


// app.get('/users/:userId/books/:bookId', function (req, res) {
//     res.send(req.params)
//   })


// --------------------     POST   --------------------------

addNewTask('Nova Uloha');




// app.post('/tasks', (req, res) => {
//     const { error } = validateTask(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     const task = {
//         id: localDatabase.length + 1,
//         name: req.body.name
//     };

//     localDatabase.push(task);
//     res.send(task);
// });



// ------------------------  PUT  ----------------------------

updateTask(5, "update");


// app.put('/tasks/:id', (req, res) => {
//     const task = localDatabase.find(task => task.id === parseInt(req.params.id));
//     if (!task) return res.status(404).send('Uloha sa nenasla')


//     const { error } = validateTask(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     task.name = req.body.name;
//     res.send(task);
// });

// ------------------------  DELETE  ----------------------------


deleteTask(19);



// app.delete('/tasks/:id', (req, res) => {
//     const task = localDatabase.find(task => task.id === parseInt(req.params.id));
//     if (!task) return res.status(404).send('Uloha sa nenasla');

//     const index = localDatabase.indexOf(task);
//     localDatabase.splice(index, 1);

//     res.send(task);
// });

//  -----------------------  VALIDACIA  ------------------------


function validateTask(task) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(task, schema);
}




app.listen(port, () => console.log(`Listening on port ${port}...`));

