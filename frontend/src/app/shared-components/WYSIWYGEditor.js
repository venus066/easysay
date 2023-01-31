import { useState, forwardRef } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    '& .rdw-dropdown-selectedtext': {
      color: 'inherit',
    },
  },
  toolbar: {
    borderWidth: '0 0 1px 0!important',
    margin: '0!important',
    display: 'none!important',
  },
  wrapper: {},
  editor: {
    padding: '8px 12px',
    overflowX: 'hidden',
    // height: `${256}px!important`,
  },
});

const WYSIWYGEditor = forwardRef((props, ref) => {
  const classes = useStyles();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  function onEditorStateChange(_editorState) {
    setEditorState(_editorState);

    return props.onChange(draftToHtml(convertToRaw(_editorState.getCurrentContent())));
  }

  return (
    <div
      className={clsx(classes.root, 'rounded-4 border-1 overflow-hidden w-full', props.className)}
      ref={ref}
      style={{ border: 'none' }}
    >
      <Editor
        editorState={editorState}
        toolbarClassName={classes.toolbar}
        wrapperClassName={classes.wrapper}
        placeholder='Type in text'
        editorClassName={classes.editor}
        onEditorStateChange={onEditorStateChange}
        editorStyle={{ overflowX: 'hidden' }}
      />
    </div>
  );
});

export default WYSIWYGEditor;
