const express = require('express');
const bodyParser = require('body-parser');

const FileApi = require('./api/FileApi');
const RunnerManager = require('./compiler/RunnerManager');

const app = express();
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files
app.use(express.static('dist'));

app.get('/api/file/:lang', (req, res) => {
  const language = req.params.lang;
  console.log(language);
  FileApi.getFile(language, (content) => {
    const file = {
      lang: language,
      code: content,
    };
    res.send(JSON.stringify(file));
  });
});

app.post('/api/run', (req, res) => {
  const file = req.body;
  console.log(`file.lang: ${file.lang}`, `file.code:${file.code}`);
  RunnerManager.run(file.lang, file.code, res);
});
app.listen(8080, () => console.log('Listening on port 8080!'));
