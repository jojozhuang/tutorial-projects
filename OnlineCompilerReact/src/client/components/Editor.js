import React from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';
import LangSelector from './controls/LangSelector';
import CodeEditor from './controls/CodeEditor';
import compilerApi from '../api/compilerApi';
import questionApi from '../api/QuestionApi';

const languages = ['C', 'C++', 'Java', 'JavaScript', 'Python'];

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLang: 2, // java
      task: {
        lang: 'java',
        code: '',
      },
      output: '',
    };

    this.handleRun = this.handleRun.bind(this);
    this.updateSolution = this.updateSolution.bind(this);
    this.handleLangChange = this.handleLangChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
  }

  componentDidMount() {
    questionApi
      .getTask('java')
      // .then(res => res.json())
      .then((task) => {
        console.log(task);
        this.setState({ task });
      });
  }

  handleCodeChange(code) {
    const { task } = this.state;
    task.code = code;
    console.log(code);
    return this.setState({ task });
  }

  handleRun(event) {
    event.preventDefault();
    const { task } = this.state;
    console.log(task);
    compilerApi
      .run(task)
      .then((response) => {
        this.setState({ output: `${response.key} ${response.message}` });
      })
      .catch((error) => {
        console.log(error);
        // this.handleError(error);
      });
  }

  updateSolution(event) {
    // event.preventDefault();
    console.log(this.state.task);
    const field = event.target.name;
    const { task } = this.state;
    task[field] = event.target.value;
    return this.setState({ task });
  }

  handleLangChange(event) {
    const index = parseInt(event.target.value, 10);
    questionApi.getTask(languages[index]).then((task) => {
      console.log(task);
      this.setState({ task });
    });
    return this.setState({ selectedLang: index });
  }

  render() {
    return (
      <div className="container">
        <Form horizontal>
          <FormGroup controlId="code">
            <Col sm={12}>
              <LangSelector
                langs={languages}
                selectedIndex={this.state.selectedLang}
                onChange={this.handleLangChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="code">
            <Col sm={12}>
              <CodeEditor onChange={this.handleCodeChange} code={this.state.task.code} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2}>
              <Button bsStyle="primary" type="button" onClick={this.handleRun}>
                Run
              </Button>
            </Col>
            <Col sm={10} />
          </FormGroup>
          <FormGroup>
            <Col sm={12}>
              <FormControl
                name="code"
                type="textarea"
                componentClass="textarea"
                rows="8"
                readOnly
                value={this.state.output}
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Editor;
