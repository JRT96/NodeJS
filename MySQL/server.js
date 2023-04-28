const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '352389Munich#',
    database: 'your_mysql_database_name'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!')
});