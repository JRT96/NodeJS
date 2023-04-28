const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root244261#',
    database: 'testingdb'
});

const sql = "INSERT INTO testingtb (name, email, city) VALUES ?";
const values = [
    ['John Doe', 'john@doe.com', 'London'],
    ['Mary Doe', 'mary@doe.com', 'Paris'],
    ['Peter Doe', 'bob@doe.com', 'New York']
];

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(`${result.affectedRows} rows inserted into testingtb`);
});



