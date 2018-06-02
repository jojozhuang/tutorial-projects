import React from 'react';
import PropTypes from 'prop-types';

// Import Brace and the AceEditor Component
import brace from 'brace';
import AceEditor from 'react-ace';
// Import a Mode (language)
import 'brace/mode/java';
// Import a Theme (okadia, github, xcode etc)
import 'brace/theme/github';

const editorStyle = {
  border: '1px solid lightgray',
  height: '500px',
  width: '100%',
};

/*

function onChange(newValue) {
  console.log('change', newValue);
}

const Editor = ({ error }) => (
  <AceEditor
    mode="java"
    theme="github"
    onChange={onChange}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{
      $blockScrolling: true,
    }}
  />
);

Editor.propTypes = {
  // error: PropTypes.object.isRequired,
};

export default Editor;
*/

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // content: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(newValue) {
    console.log(newValue);
    this.props.onContentChange(newValue);
    // this.setState({ content: newValue });
  }

  render() {
    return (
      <AceEditor
        style={editorStyle}
        mode="java"
        theme="github"
        value={this.props.solution}
        onChange={this.handleChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{
          $blockScrolling: true,
        }}
      />
    );
  }
}

Editor.propTypes = {
  solution: PropTypes.string.isRequired,
  onContentChange: PropTypes.func.isRequired,
};

export default Editor;
