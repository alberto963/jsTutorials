const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.end(`
  <body onload="helpText.forEach(item =>
    document.getElementById(item.id).onfocus = () => showHelp(item.help))">
  <p id="help">Helpful notes will appear here</p>
  <p>E-mail: <input type="text" id="email" name="email"></p>
  <p>Name: <input type="text" id="name" name="name"></p>
  <p>Age: <input type="text" id="age" name="age"></p>
  <script>
    const helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];
    const showHelp = help => document.getElementById('help').innerHTML = help;
  </script>
  </body>`, 
  () => console.info('This callback is called when the request stream is finished'));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});