const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

// setup route middlewares
const csrfMiddleware = csurf({ cookie: true });
app.use(csrfMiddleware);

var parseForm = bodyParser.urlencoded({ extended: false })
app.use(parseForm);

app.use(pino);

app.get('/api/getCsrf', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({
    _csrf: req.csrfToken()
  }));
});

app.post('/api/reset', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ date: new Date(0) }));
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);