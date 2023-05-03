const mysql = require('mysql');
const fs = require('fs');
const http = require('http');
const path = require('path');
// const { url } = require('inspector');

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



server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
  });


const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
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




