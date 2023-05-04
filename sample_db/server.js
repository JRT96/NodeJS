const mysql = require('mysql');
const fs = require('fs');
const http = require('http');
const path = require('path');

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




const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  if (req.url === '/add'){
    addPerson(req, res);
  }
  fs.access(filePath, fs.constants.F_OK, (err) => {
      if(err) {
          res.statusCode = 404;
          res.end('404 - Page  not found');
      } else {
          fs.readFile(filePath, (err, data) => {
              if(err) {
                  res.statusCode = 500;
                  res.end('500 - Internal server error');
              } else {
                  res.statusCode = 200;
                  res.end(data);
              }
          });
      }}
  );
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
  });

let addPerson = (req, res) => {
    let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const data = new URLSearchParams(body);
    const person = Object.fromEntries(data);
    console.log(person);
    connection.query('INSERT INTO users SET ?', person, (err, result) => {
      if (err) throw err;
      console.log('Person added to database.');
      // res.writeHead(302, { 'location': '/add' }); // Redirect to add product page
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write("Person added to database")
            res.end();
    });
  });
};


