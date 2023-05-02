const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root244261#',
    database: 'sample_db'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

