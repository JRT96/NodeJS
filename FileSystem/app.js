const fs = require('fs');

fs.writeFile('myFile.txt', 'Hello World!', (err) => {
    if (err) throw err;
  console.log('The file has been saved!');

});

// fs.readFile('myFile.txt', (err, data) => {
//     if (err) throw err;
//   console.log(data.toString());
// });

// fs.appendFile('myFile.txt', 'Hello World!', (err) => {
//     if (err) throw err;
//   console.log('Data updated to file!');

// });

// fs.unlink('myFile.txt', (err) => {
//     if (err) throw err;
//   console.log('File deleted!');

// });