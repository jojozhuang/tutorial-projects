// const os = require('os');
// import javaCompiler from './compiler/run_java';
const compiler = require('./compiler/compiler');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'));
app.post('/api/runc', (req, res) => {
  const answer = req.body.answer;
  console.log('answer =');
  console.log(req.body);
  const result = {
    key: '0',
    message: 'OK!',
  };
  compiler.clang('HelloC.c');
  res.end(JSON.stringify(result));
});
app.post('/api/runjava', (req, res) => {
  const answer = req.body.answer;
  console.log('answer =');
  console.log(req.body);
  const result = {
    key: '0',
    message: 'OK!',
  };
  // compiler.clang('HelloC.c');
  compiler.java('HelloJava.java');
  res.end(JSON.stringify(result));
});
app.listen(8080, () => console.log('Listening on port 8080!'));
