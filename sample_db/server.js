const mysql = require('mysql');
const toSqlDatetime = (inputDate) => {
    const date = new Date(inputDate)
    const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
    return dateWithOffest
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
}

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


const sql = "INSERT INTO users (name, email, created_at, updated_at) VALUES = ?";
const values = [
    ['John Merner', 'john@sample.com', toSqlDatetime(new Date()), toSqlDatetime(new Date())],
    ['Kelly Morrison', 'kelly@sample.com', toSqlDatetime(new Date()), toSqlDatetime(new Date())],
    ['Jennifer Smith', 'jennifer@sample.com', toSqlDatetime(new Date()), toSqlDatetime(new Date())],
    ['Michael Jordan', 'michael@sample.com', toSqlDatetime(new Date()), toSqlDatetime(new Date())]
];

connection.query(sql, [values], (err, result) => {
    if (err) throw err;
    console.log(`${result.affectedRows} record(s) inserted`);
});

