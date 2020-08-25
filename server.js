const express = require('express');
const app = express();
app.use(express.json());
const pool = require('./connection');




pool.getConnection()
.then(conn => {console.log('Connect')})

    
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





 
// --------------------     GET   --------------------------



// app.get('/', (req, res) => {
//     res.send('Hello world!');
// });

// app.get('/api', (req, res) => {
//     res.send([10, 20, 30]);
// });
// app.get('/reverse/:text', (req, res) => {
//     res.send([...req.params.text].reverse().join(''));
// });

// app.get('/api/movies', (req, res) =>{
//     res.send(movies);
// });

// app.get('/api/movies/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const movie = movies.find( movie => movie.id === id);
//     if(movie) {
//             res.send(movie);
//         } else {
//             res.status(404).send('Film sa nenasiel');
//         }
    
// });



// --------------------     POST   --------------------------


// app.post('/api/movies', (req, res) => {
//     const { error } = validateMovie(req.body);
//     if(error) {
//         res.status(400).send(error.details[0].message);
//     } else {
//     const movie = {
//     id: movies.length +1,
//     name: req.body.name,
//     year: req.body.year
// }
// movies.push(movie);
// res.send(movie);
//     }
// });





app.listen(3000, () => console.log('Listening on port 3000...'));

// function validateMovie(movie) {
//     const schema = {
//         name: Joi.string().min(3).required(),
//         year: Joi.number()
//     };
//     return Joi.validate(movie, schema);
// }
