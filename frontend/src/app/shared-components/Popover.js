import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import {useDispatch, useSelector} from "react-redux";
import {showDialog} from "./store/wysiwygSlice";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    paper: {
        maxWidth: 600,
        overflow: 'auto',
    },
}));

export default function SimplePopover(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const mode = useSelector(({ wysiwygEditor }) => wysiwygEditor.wysiwyg.mode);
    const candidates = useSelector(({ rephraseApp }) => rephraseApp.rephrase.candidates);
    const isOpenDialog = useSelector(({ wysiwygEditor }) => wysiwygEditor.wysiwyg.isOpenDialog);

    const handleClose = () => {
        dispatch(showDialog(false));
    };

    return (
        <div>
            <Popover
                disableAutoFocus={true}
                disableEnforceFocus={true}
                open={isOpenDialog}
                anchorReference="anchorPosition"
                anchorPosition={{ top: props.top, left: props.left }}
                onClose={handleClose}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <Paper className={classes.paper}>
                    <DialogTitle>{"Select a sentence to replace the text."}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Let Google help apps determine location.</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {/*<Button onClick={handleClickButton} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={handleClickButton} color="primary">
                            Agree
                        </Button>*/}
                    </DialogActions>
                </Paper>
            </Popover>
        </div>
    );
}