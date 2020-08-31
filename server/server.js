const express = require("express");
const app = express();
app.use(express.json());
const Joi = require('joi');
require('dotenv').config();
const port = process.env.PORT || 3000;
app.use("../client", express.static('public'))
const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: '127.0.0.1', 
    user:'root', 
    password: '12345',
    database: 'tasks'
});


const addNewTask = (text) => {
    pool.getConnection()
        .then(conn => {
            // conn.query("SELECT * FROM ulohy")
            //     .then((req, res) => {
                    conn.query(`INSERT INTO ulohy (NAME) VALUE ("${text}")`
                    );
                    // console.log(text)  // kontrola v konzole
                })
       
}
// const getTask = () => {
//     pool.getConnection()
//         .then(conn => {
//             conn.query("SELECT * FROM ulohy")
//             .then(res => {
//                 return (res)
//             })
//         })
// }


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


// app.use('/time/:id', function (req, res, next) {
//     console.log(req.method);
// next();
// })

// pool.getConnection()
// .then( conn => {
//     conn.query('SELECT * from ulohy', function (err, rows, fields) {
//         if (err) throw err
      
//         console.log('The solution is: ', rows)
//       })
      
//       conn.end()
// })




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

app.get('/data', (req, res) => {
    return pool.query('SELECT * FROM ulohy')
    .then(result => {
        res.json(result);
    });
});

app.get('/data/:id', (req, res) => {
    return pool.query('SELECT * FROM ulohy')
        .then(result => {
            const task = result.find(task => task.id === parseInt(req.params.id));
            res.json(task);
        });
})
    // const task = localDatabase.find(task => task.id === parseInt(req.params.id));
    // if (!task) return res.status(404).send('Uloha sa nenasla')
    // res.send(task);

// app.get('/tasks', (req, res) => {
//     // res.json([{
//     //     id: 1,
//     //     name: "Hiccup",
//     //     password: 'hiccup'
//     //   }, {
//     //     id: 2,
//     //     name: "King Arthur",
//     //     password: 'king-arthur'
//     //   }]);
//     console.log(getTask())
//     // res.json(getTask())
// });

// app.get('/api/hello', (req, res) => {
//     res.send({ express: 'Hello From Express' });
//   });

// app.get('/tasks/:id', (req, res) => {
//     const task = localDatabase.find(task => task.id === parseInt(req.params.id));
//     if (!task) return res.status(404).send('Uloha sa nenasla')
//     res.send(task);
// });



// --------------------     POST   --------------------------

// addNewTask('Nova Uloha');






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

// updateTask(5, "update");


// app.put('/tasks/:id', (req, res) => {
//     const task = localDatabase.find(task => task.id === parseInt(req.params.id));
//     if (!task) return res.status(404).send('Uloha sa nenasla')


//     const { error } = validateTask(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     task.name = req.body.name;
//     res.send(task);
// });

// ------------------------  DELETE  ----------------------------


// deleteTask(1);



// app.delete('/data/:id', (req, res) => {
//     const task = localDatabase.find(task => task.id === parseInt(req.params.id));
//     if (!task) return res.status(404).send('Uloha sa nenasla');

//     const index = localDatabase.indexOf(task);
//     localDatabase.splice(index, 1);

//     res.send(task);
// });

//  -----------------------  VALIDACIA  ------------------------


// function validateTask(task) {
//     const schema = {
//         name: Joi.string().min(3).required()
//     };

//     return Joi.validate(task, schema);
// }



// console.log(localDatabase)
app.listen(port, () => console.log(`Listening on port ${port}...`));

