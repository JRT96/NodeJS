const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root244261#',
    database: 'testingdb'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

// const sql = "INSERT INTO testingtb (name, email, city) VALUES ?";
// const values = [
//     ['John Doe', 'john@doe.com', 'London'],
//     ['Mary Doe', 'mary@doe.com', 'Paris'],
//     ['Peter Doe', 'bob@doe.com', 'New York']
// ];

const sql = "SELECT * FROM testingtb WHERE city = ?";
const city = ['London'];

connection.query(sql, [city], (err, result, fields) => {
    if (err) throw err;
    console.log(result);
});








