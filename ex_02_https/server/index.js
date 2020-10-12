const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('chiave_privata.pem'),
  cert: fs.readFileSync('certificato.pem')
};

server = https.createServer(options, (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Esempio server HTTPS\n');
})

const callback = () => {
  const address = server.address().address;
  const port = server.address().port;
  console.log(`
  Server avviato all'indirizzo https://${address}:${port}
  `);
}

server
  .listen(
    4444, 
    '127.0.0.1',
    callback
  )