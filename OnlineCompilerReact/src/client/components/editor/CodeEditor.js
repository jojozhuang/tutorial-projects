import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  DropdownButton,
  MenuItem,
  Button,
} from 'react-bootstrap';
import Dropdown from '../controls/Dropdown';
import Editor from '../controls/Editor';
import compilerApi from '../../api/compilerApi';
import questionApi from '../../api/QuestionApi';

// Import Brace and the AceEditor Component
import brace from 'brace';
import AceEditor from 'react-ace';
// Import a Mode (language)
import 'brace/mode/java';
// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/github';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {
        qid: '1',
        solution: 'aaa',
      },
      output: '',
    };

    this.handleSubmtC = this.handleSubmtC.bind(this);
    this.handleSubmtJava = this.handleSubmtJava.bind(this);
    this.updateSolution = this.updateSolution.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
  }

  componentDidMount() {
    questionApi
      .getQuestion('1')
      // .then(res => res.json())
      .then((question) => {
        console.log(question);
        this.setState({ question });
      });
  }

  handleContentChange(content) {
    const question = this.state.question;
    question.solution = content;
    console.log(content);
    return this.setState({ question });
    /*
    const question = this.state.question;
    question.solution = content;
    return this.setState({ question });
*/

    // const question = this.state.question;
    // question.solution = content;
    // return this.setState({ question });
  }

  handleSubmtC(event) {
    event.preventDefault();
    const question = this.state.question;
    console.log(question);
    compilerApi
      .submitc(question)
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
    const question = this.state.question;
    console.log(question);
    compilerApi
      .submitjava(question)
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
    console.log(this.state.question);
    const field = event.target.name;
    const question = this.state.question;
    question[field] = event.target.value;
    return this.setState({ question });
  }

  handleSelect(event) {
    console.log(event.target);
    const field = event.target.name;
    const question = this.state.question;
    question[field] = event.target.value;
    return this.setState({ question });
  }

  render() {
    return (
      <div className="container">
        <h1>Input code to submit to server</h1>
        <Form horizontal>
          <FormGroup controlId="code">
            <Col componentClass={ControlLabel} sm={1}>
              Language:
            </Col>
            <Col sm={11}>
              <Dropdown title="Default" />
            </Col>
          </FormGroup>
          <FormGroup controlId="code">
            <Col componentClass={ControlLabel} sm={1}>
              Language:
            </Col>
            <Col sm={11}>
              <Editor
                onContentChange={this.handleContentChange}
                solution={this.state.question.solution}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="code">
            <Col componentClass={ControlLabel} sm={1}>
              Code:
            </Col>
            <Col sm={11}>
              <FormControl
                name="solution"
                type="textarea"
                componentClass="textarea"
                placeholder="Enter code"
                rows="6"
                value={this.state.question.solution}
                onChange={this.updateSolution}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={1} sm={11}>
              <Button bsStyle="primary" type="button" onClick={this.handleSubmtC}>
                Submit C
              </Button>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={1} sm={11}>
              <Button bsStyle="primary" type="button" onClick={this.handleSubmtJava}>
                Submit Java
              </Button>
            </Col>
          </FormGroup>
          <FormGroup controlId="code">
            <Col componentClass={ControlLabel} sm={1}>
              Output:
            </Col>
            <Col sm={11}>
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

export default CodeEditor;
