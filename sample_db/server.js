const mysql = require('mysql2');
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
  res.writeHead(200, { 'Content-Type': 'text/html' });
if (req.url === '/') {
  filePath = path.join(__dirname, 'public', 'index.html');
}

else if (req.url === '/add') {
  filePath = path.join(__dirname, 'public', 'add.html');
}
else filePath = req.url;
  if (req.url === '/save') {
    addPerson(req, res);
  }
  else if (req.url === '/list') {
    listPeople(req, res);
  }
  else {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.statusCode = 404;
        res.end('404 - Page  not found');
      } else {
        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.statusCode = 500;
            res.end('500 - Internal server error');
          } else {
            res.statusCode = 200;
            res.end(data);
          }
        });
      }
    }
    );
  }
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
      res.writeHead(302, { location: '/' });
      res.end();
    });
  });
};


let listPeople = (req, res) => {
  connection.query('SELECT * FROM users', (err, rows) => {
    if (err) throw err;
    console.log('Data received from Db:\n');
    let html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
<div class="container-fluid">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/add">Add</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/list">List</a>
      </li>
    </ul>
  </div>
</div>
</nav>
<div>
    <h1>List of people</h1>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>

 `;
    rows.forEach((row) => {
      html += `
      <td>${row.id}</td>
      <td>${row.name}</td>
      <td>${row.email}</td>
      <td><a class="btn btn-link p-0" onclick='editProduct(${JSON.stringify(row)})'><i class="fa fa-edit" style="font-size:24px"></i></a> <a class="btn btn-link p-0" href="/deleteproduct?id=${row.id}"> <i class="fa fa-trash-o" style="font-size:24px"></i></a></td>;
      </tr>`;
    });
`
    </tbody>
    </table>
    </div>

    <!-- Modal -->
     <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
              </button>

          </div>
          <div class="modal-body">
            <form id="editForm">
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" name="name" placeholder="Enter name">
                <label for="email">Email</label>
                <input type="text" class="form-control" id="email" name="email" placeholder="Enter email">
                </div>
            </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
    


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
    
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(html);
    console.log(html);
    res.end();
  });

};

let deleteUser  = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const data = new URLSearchParams(body);
    const person = Object.fromEntries(data);
    console.log(person);
    connection.query('DELETE FROM users WHERE id = ?', person.id, (err, result) => {
      if (err) throw err;
      console.log('Person deleted from database.');
      res.writeHead(302, { location: '/' });
      res.end();
    });
  });

};

let updateUser = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const data = new URLSearchParams(body);
    const person = Object.fromEntries(data);
    console.log(person);
    connection.query('UPDATE users SET ? WHERE id = ?', [person, person.id], (err, result) => {
      if (err) throw err;
      console.log('Person updated in database.');
      res.writeHead(302, { location: '/' });
      res.end();
    });
  });


};