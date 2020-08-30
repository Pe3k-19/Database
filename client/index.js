
// document.addEventListener('DOMContentLoaded', function () {
//     fetch('http://localhost:5000/rows')
//     .then(response => response.json())
//     .then(data => console.log(data));
//     loadHTMLTable([]);
// });

// function loadHTMLTable(data) {
// const table = document.querySelector('table tbody');

// if(data.length === 0) {
//     table.innerHTML = "<tr><td class='no-data' colspan = '5'>No Data</td></tr>"
// }
// }

const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})


module.exports = router
