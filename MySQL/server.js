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

const newEmail = 'new_email@example.com';

connection.query(`UPDATE testingtb SET email = ? WHERE idtestingtb = ?`, [newEmail,2], (error, results, fields) => {
    if (error) throw error;
    console.log('User updated successfully!');
});









