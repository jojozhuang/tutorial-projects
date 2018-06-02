import React from 'react';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';
import DropdownLanguage from './controls/DropdownLanguage';
import CodeEditor from './controls/CodeEditor';
import compilerApi from '../api/compilerApi';
import questionApi from '../api/QuestionApi';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        lang: 'java',
        code: '',
      },
      output: '',
    };

    this.handleSubmtC = this.handleSubmtC.bind(this);
    this.handleSubmtJava = this.handleSubmtJava.bind(this);
    this.updateSolution = this.updateSolution.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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
    const task = this.state.task;
    task.code = code;
    console.log(code);
    return this.setState({ task });
  }

  handleSubmtC(event) {
    event.preventDefault();
    const task = this.state.task;
    console.log(task);
    compilerApi
      .submitc(task)
      .then((response) => {
        this.setState({ output: `${response.key} ${response.message}` });
      })
      .catch((error) => {
        console.log(error);
        // this.handleError(error);
      });
  }

  handleSubmtJava(event) {
    event.preventDefault();
    const task = this.state.task;
    console.log(task);
    compilerApi
      .submitjava(task)
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
    const task = this.state.task;
    task[field] = event.target.value;
    return this.setState({ task });
  }

  handleSelect(event) {
    console.log(event.target);
    const field = event.target.name;
    const task = this.state.task;
    task[field] = event.target.value;
    return this.setState({ task });
  }

  render() {
    return (
      <div className="container">
        <Form horizontal>
          <FormGroup controlId="code">
            <Col componentClass={ControlLabel} sm={1}>
              Language:
            </Col>
            <Col sm={11}>
              <DropdownLanguage bsStyle="default" title="Language" onSelect={this.handleSelect} />
            </Col>
          </FormGroup>
          <FormGroup controlId="code">
            <Col sm={12}>
              <CodeEditor onChange={this.handleCodeChange} code={this.state.task.code} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2}>
              <Button bsStyle="primary" type="button" onClick={this.handleSubmtJava}>
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
