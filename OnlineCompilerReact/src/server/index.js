const express = require('express');
const bodyParser = require('body-parser');

const compiler = require('./compiler/compiler');
const taskApi = require('./compiler/taskApi');

const app = express();
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files
app.use(express.static('dist'));

app.get('/api/task/:lang', (req, res) => {
  const language = req.params.lang;
  console.log(language);
  taskApi.getTask(language, (content) => {
    const task = {
      lang: language,
      code: content,
    };
    res.send(JSON.stringify(task));
  });
});

app.post('/api/run', (req, res) => {
  const task = req.body;
  console.log(`task =${task}`);
  // compiler.java('HelloJava.java');
  if (task.lang.toLowerCase() === 'c') {
    taskApi.saveTask('HelloC.c', task.code, () => {
      compiler.clang('HelloC.c', (status, message) => {
        const result = {
          status,
          message,
        };
        res.end(JSON.stringify(result));
      });
    });
  } else {
    taskApi.saveTask('HelloJava2.java', task.code, () => {
      compiler.java('HelloJava2.java', (status, message) => {
        const result = {
          status,
          message,
        };
        res.end(JSON.stringify(result));
      });
    });
  }
});
app.listen(8080, () => console.log('Listening on port 8080!'));
