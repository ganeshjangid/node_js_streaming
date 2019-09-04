/* const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  fs.readFile('./docs.txt', (err, data) => {
    if (err) throw err;
  
    res.end(data);
  });
});

server.listen(5065); */


const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  const src = fs.createReadStream('./docs.txt');
  src.pipe(res);
});

server.listen(5065);