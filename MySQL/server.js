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

const sql = "DELETE FROM testingtb WHERE city = ?";
const city = ['London'];

connection.query(sql, [city], (err, result, fields) => {
    if (err) throw err;
    console.log(`${result.affectedRows} record(s) deleted`);
});








