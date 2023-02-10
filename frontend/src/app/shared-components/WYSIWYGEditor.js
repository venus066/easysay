import {forwardRef, useEffect, useState} from 'react';
import {convertToRaw, EditorState, getVisibleSelectionRect, Modifier, SelectionState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {changeMode, showDialog, updateEditorState} from './store/wysiwygSlice';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from './store';
import {getCandidates} from "../main/apps/rephrase/store/rephraseSlice";
import CustomDialog from "./CustomDialog";

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
  wrapper: {
    height: '100%',
  },
  editor: {
    padding: '8px 12px',
    overflowX: 'hidden',
  },
});

const WYSIWYGEditor = forwardRef((props, ref) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const candidates = useSelector(({ rephraseApp }) => rephraseApp.rephrase.candidates);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [rephraseStart, setRephraseStart] = useState(0);
  const [rephraseEnd, setRephraseEnd] = useState(0);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  const {mode, sentence, isOpenDialog} = useSelector(({wysiwygEditor}) => wysiwygEditor.wysiwyg);

  useEffect(() => {
    if (sentence) {
      dispatch(getCandidates(sentence));
      dispatch(showDialog(true));
    }
  }, [sentence]);

  useEffect(() => {
    if (isOpenDialog === false) {
      dispatch(updateEditorState({sentence: '', selectedText: '', blockedText: ''}));
    }
  }, [isOpenDialog]);

  useEffect(() => {
    if (mode === 0) {
      return;
    }
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const blockedText = currentContentBlock.getText();
    if (blockedText.length === 0) {
      return;
    }

    // start and end of selected word
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();

    const selectedText = currentContentBlock.getText().slice(start, end);

    const { sentence, s_start, s_end } = getSentence(start, end, blockedText);

    const selection = editorState.getSelection();
    const updateSelection = new SelectionState({
      anchorKey: selection.getAnchorKey(),
      anchorOffset: s_start,
      focusKey: selection.getFocusKey(),
      focusOffset: s_end,
      isBackward: false,
    });

    let newEditorState = EditorState.acceptSelection(
        editorState,
        updateSelection
    );
    newEditorState = EditorState.forceSelection(newEditorState, newEditorState.getSelection());
    setEditorState(newEditorState);
    dispatch(updateEditorState({sentence, selectedText, blockedText}));
  }, [mode]);

  const getSentence = (start, end, blockedText) => {
    let s_start = 0;

    // get start position of the sentence
    for (let i = start; i >= 0; i --) {
      if (blockedText.charAt(i) === '.' || blockedText.charAt(i) === '?' || blockedText.charAt(i) === '!') {
        s_start = i + 2;
        break;
      }
    }
    setRephraseStart(s_start);

    // get end position of the sentence
    let s_end = blockedText.length - 1;
    for (let i = end; i <= blockedText.length; i ++) {
      if (blockedText.charAt(i) === '.' || blockedText.charAt(i) === '?' || blockedText.charAt(i) === '!') {
        s_end = i ;
        break;
      }
    }
    setRephraseEnd(s_end);

    const sentence = blockedText.substring(s_start, s_end);

    return { sentence, s_start, s_end };
  }

  const replaceText = (key) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    const newContentState = Modifier.replaceText(contentState, selectionState, candidates[key]);
    setEditorState(EditorState.push(
      editorState,
      newContentState,
      'replace-text'
    ));
    // dispatch(rephraseText);
  }

  const onEditorStateChange = (_editorState) => {
    // get position of cursor
    let position = getVisibleSelectionRect(window);
    if (position) {
      setLeft(position.left);
      setTop(position.top + position.height);
    }

    if (isOpenDialog === true) {
      return
    }

    dispatch(changeMode(0));
    setEditorState(_editorState);
    return props.onChange(draftToHtml(convertToRaw(_editorState.getCurrentContent())));
  }

  return (
      <div
          className={clsx(classes.root, 'rounded-4 border-1 overflow-hidden w-full', props.className)}
          style={{height: '100%'}}
          ref={ref}
      >
        <Editor
            editorState={editorState}
            toolbarClassName={classes.toolbar}
            wrapperClassName={classes.wrapper}
            placeholder='Type in text'
            editorClassName={classes.editor}
            stripPastedStyles={true}
            onEditorStateChange={onEditorStateChange}
            editorStyle={{overflowX: 'hidden'}}
        />
        <CustomDialog
            onReplace={replaceText}
            mode={mode}
            left={left}
            top={top} />
      </div>
  );
});

export default withReducer('wysiwygEditor', reducer)(WYSIWYGEditor);