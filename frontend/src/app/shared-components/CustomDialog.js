import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import {useDispatch, useSelector} from "react-redux";
import {showDialog} from "./store/wysiwygSlice";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import FuseScrollbars from "../../@fuse/core/FuseScrollbars";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

const HEADER = ['', 'Rephrase a sentence'];

const useStyles = makeStyles((theme) => ({
    /*typography: {
        padding: theme.spacing(2),
    },*/
    progress: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        maxWidth: 600,
        overflow: 'auto',
        borderRadius: 0,
    },
    paperContent: {
        height: 200,
        width: 400,
    }
}));

export default function CustomDialog(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isOpenDialog = useSelector(({ wysiwygEditor }) => wysiwygEditor.wysiwyg.isOpenDialog);
    const isLoading = useSelector(({ wysiwygEditor }) => wysiwygEditor.wysiwyg.isLoading);
    const rephraseApp = useSelector(({ rephraseApp }) => rephraseApp);

    const handleClose = () => {
        dispatch(showDialog(false));
    };

    const replace = (key) => {
        if (props.onReplace !== undefined) {
            dispatch(showDialog(false));
            props.onReplace(key);
        }
    }

    const copy = (key) => {
        // dispatch(showDialog(false));
        console.log(rephraseApp.rephrase.candidates[key]);
        if (navigator.clipboard) {
            navigator.clipboard.writeText(rephraseApp.rephrase.candidates[key]);
        }
    }

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
                    horizontal: "center",
                }}
            >
                <Paper className={classes.paper}>
                    <DialogTitle>{HEADER[props.mode]}</DialogTitle>
                    <DialogContent className={classes.paperContent}>
                        <div className={classes.progress}>
                            <Fade
                                in={isLoading}
                                style={{
                                    transitionDelay: isLoading ? '800ms' : '0ms',
                                }}
                                unmountOnExit
                            >
                                <CircularProgress />
                            </Fade>
                        </div>
                        <FuseScrollbars>
                            <List component="nav" className={classes.root} aria-label="contacts">
                                {
                                    rephraseApp && rephraseApp.rephrase && rephraseApp.rephrase.candidates?
                                    rephraseApp.rephrase.candidates.map((value, key) => {
                                        return (
                                            <ListItem key={key} dense button onClick={() => {replace(key)}}>
                                                <ListItemText primary={value} />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="comments" role="button" onClick={(e) => {copy(key)}}>
                                                        <FileCopyIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        );
                                    }): null
                                }
                            </List>
                        </FuseScrollbars>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Paper>
            </Popover>
        </div>
    );
}