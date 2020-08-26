const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  res.end(`
  <body onload="setupHelp()">
  <p id="help">Helpful notes will appear here</p>
  <p>E-mail: <input type="text" id="email" name="email"></p>
  <p>Name: <input type="text" id="name" name="name"></p>
  <p>Age: <input type="text" id="age" name="age"></p>
  <script>
  function showHelp(help) {
    document.getElementById('help').innerHTML = help;
  }
  function setupHelp() {
    var helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
      ];
    for (var i = 0; i < helpText.length; i++) {
      /*
       * The variable item is declared with var and thus has function scope due to hoisting.
       * The value of item.help is determined when the onfocus callbacks are executed.
       * Because the loop has already run its course by that time,
       * the item variable object (shared by all three closures) 
       * has been left pointing to the last entry in the helpText list.
       */
      // var item = helpText[i];

      /*
       * Hence var is not correct, using let or const solves the issue
       */
      const item = helpText[i];
      document.getElementById(item.id).onfocus = function() {
        showHelp(item.help);
      }
    }
  }
  </script>
  </body>`, 
  () => console.info('This callback is called when the request stream is finished'));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});