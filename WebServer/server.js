const http =  require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url)
    if(req.url === '/'){
        serveResource('index.html', res);
    } 
    else if (req.url === '/about'){
        serveResource('about.html', res);
    }
    else {
        res.writeHeader(404, {'Content-Type': 'text/html'});
         res.end('<h1>404 Not Found</h1>');
    
    };
        

    
    
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});

const serveResource = (resource, res) => {
    fs.readFile(resource, (err, data) => {
        if (err) throw err;
        res.writeHeader(200, {'Content-Type': 'text/html'});
         res.end(data);
    });
} 

