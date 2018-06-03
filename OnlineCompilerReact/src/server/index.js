const express = require('express');
const bodyParser = require('body-parser');

const taskApi = require('./compiler/taskApi');
const Runner = require('./compiler/Runner');

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
  console.log(`task.lang: ${task.lang}`, `task.code:${task.code}`);
  Runner.run(task.lang, task.code, res);
});
app.listen(8080, () => console.log('Listening on port 8080!'));
