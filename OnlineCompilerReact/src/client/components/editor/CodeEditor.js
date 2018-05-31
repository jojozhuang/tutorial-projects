import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';
import compilerApi from '../../api/compilerApi';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: {
        qid: '1',
        solution: 'aaa',
      },
      output: '',
    };

    this.handleSubmtC = this.handleSubmtC.bind(this);
    this.handleSubmtJava = this.handleSubmtJava.bind(this);
  }

  handleSubmtC(event) {
    event.preventDefault();
    const answer = this.state.answer;
    console.log(answer);
    compilerApi
      .submitc(answer)
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
    const answer = this.state.answer;
    console.log(answer);
    compilerApi
      .submitjava(answer)
      .then((response) => {
        this.setState({ output: `${response.key} ${response.message}` });
      })
      .catch((error) => {
        console.log(error);
        // this.handleError(error);
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Input code to submit to server</h1>
        <Form horizontal>
          <FormGroup controlId="code">
            <Col componentClass={ControlLabel} sm={2}>
              Code:
            </Col>
            <Col sm={10}>
              <FormControl
                name="code"
                type="textarea"
                componentClass="textarea"
                placeholder="Enter code"
                rows="6"
                defaultValue={this.state.answer.solution}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" type="button" onClick={this.handleSubmtC}>
                Submit C
              </Button>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button bsStyle="primary" type="button" onClick={this.handleSubmtJava}>
                Submit Java
              </Button>
            </Col>
          </FormGroup>
          <FormGroup controlId="code">
            <Col componentClass={ControlLabel} sm={2}>
              Output:
            </Col>
            <Col sm={10}>
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
