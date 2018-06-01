// const os = require('os');
// import javaCompiler from './compiler/run_java';
const compiler = require('./compiler/compiler');
const questionApi = require('./compiler/questionApi');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'));

app.get('/api/questions/:id', (req, res) => {
  const id = req.params.id;
  questionApi.getQuestion(id, (content) => {
    const response = {
      qid: '1',
      solution: content,
    };
    res.send(JSON.stringify(response));
  });
});

app.post('/api/runc', (req, res) => {
  const question = req.body.question;
  console.log('question =');
  console.log(req.body);
  // compiler.clang('HelloC.c');
  compiler.clang('HelloC.c', (response) => {
    const result = {
      key: '0',
      message: response,
    };
    res.end(JSON.stringify(result));
  });
});
app.post('/api/runjava', (req, res) => {
  console.log(req.body);
  const question = req.body;
  console.log('question =');
  console.log(question);
  // compiler.java('HelloJava.java');
  questionApi.saveSolution('HelloJava2.java', question.solution, () => {
    compiler.java('HelloJava2.java', (response) => {
      const result = {
        key: '0',
        message: response,
      };
      res.end(JSON.stringify(result));
    });
  });
});
app.listen(8080, () => console.log('Listening on port 8080!'));
