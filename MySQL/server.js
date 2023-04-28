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

    connection.query('SELECT * FROM testingtb', (err, rows) => {
        if (err) throw err;
        console.log('Data received from MySQL:\n')
        console.log(rows);

        connection.end((err) => {
            if (err) throw err;
            console.log('Connection closed.')
        });
    });
});

