import React, { Component } from 'react';
import { EditorState, Editor } from 'draft-js';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';

const defaultState = {
  editorState: EditorState.createEmpty(),
};

const reducer = (state = defaultState, { payload, type }) => {
  if (type === 'UPDATE_EDITOR_STATE') {
    console.log('redux action: ', type, payload.getCurrentContent().getPlainText());
    return {
      ...state,
      editorState: payload,
    };
  }
  return state;
};

const store = createStore(reducer);

const AppEditor = ({ editorState, onSaveEditorState }) => (
  <Editor
    editorState={editorState}
    onChange={onSaveEditorState}
  />
);

const mapStateToProps = ({ editorState }) => ({ editorState });

const mapDispatchToProps = (dispatch) => ({
  onSaveEditorState: (editorState) => {
    dispatch({
      type: 'UPDATE_EDITOR_STATE',
      payload: editorState,
    })
  }
});

const ConnectedEditor = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppEditor);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedEditor/>
      </Provider>
    );
  }
}

export default App;
