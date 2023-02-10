import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import NavbarToggleButton from 'app/fuse-layouts/shared-components/NavbarToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import clsx from 'clsx';
import {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectToolbarTheme} from 'app/store/fuse/settingsSlice';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import {Link} from "react-router-dom";
import {changeMode} from "../../../shared-components/store/wysiwygSlice";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .icon-button span:first-child': {
      flexDirection: 'column',
    },
  },
}));

function ToolbarLayout2(props) {
  const dispatch = useDispatch();
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
  const toolbarTheme = useSelector(selectToolbarTheme);
  const login = useSelector(({ auth }) => auth.login);

  const wysiwygEditor = useSelector( ({ wysiwygEditor }) => wysiwygEditor);
  const classes = useStyles(props);

  const onClickRephrase = (mode) => {
    dispatch(changeMode(1));
  }

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx(classes.root, 'flex relative z-20 shadow-md', props.className)}
        color="default"
        style={{ backgroundColor: toolbarTheme.palette.background.paper }}
      >
        <Toolbar className="container p-0 lg:px-24 min-h-48 md:min-h-64">
          {config.navbar.display && (
            <Hidden lgUp>
              <NavbarToggleButton className="w-40 h-40 p-0 mx-0 sm:mx-8" />
            </Hidden>
          )}

          <div className="flex flex-1">
            <Link to="/apps/chat" role="button" className="mr-20">
              <Tooltip
                  title="Chat to AI Bot"
                  placement='bottom'
              >
                <IconButton className="w-40 h-40 p-0 icon-button">
                  <Icon>chat</Icon>
                  <Typography variant="caption">Chat</Typography>
                </IconButton>
              </Tooltip>
            </Link>
            <Link to="/apps/rephrase" role="button" onClick={onClickRephrase} className="mr-20">
              <Tooltip
                  title="Rephrase"
                  placement='bottom'
              >
                <IconButton className="w-40 h-40 p-0 icon-button">
                  <Icon>edit</Icon>
                  <Typography variant="caption">Rephrase</Typography>
                </IconButton>
              </Tooltip>
            </Link>

            <Link to="/" role="button" className="mr-20">
              <Tooltip
                  title="paragraph"
                  placement='bottom'
              >
                <IconButton className="w-40 h-40 p-0 icon-button">
                  <Icon>grading</Icon>
                  <Typography variant="caption">Paragraph</Typography>
                </IconButton>
              </Tooltip>
            </Link>

            <Link to="/" role="button" className="mr-20">
              <Tooltip
                  title="article"
                  placement='bottom'
              >
                <IconButton className="w-40 h-40 p-0 icon-button">
                  <Icon>article</Icon>
                  <Typography variant="caption">Article</Typography>
                </IconButton>
              </Tooltip>
            </Link>
          </div>

          <div className="flex items-center px-8 h-full overflow-x-auto">
            <Link to="/" role="button">
              <Tooltip
                  title="languages"
                  placement='bottom'
              >
                <IconButton className="w-40 h-40 p-0">
                  <Icon>settings</Icon>
                </IconButton>
              </Tooltip>
            </Link>
            {
              login.success === true?
                  (<UserMenu />)
                  :
                  (<></>)
            }
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout2);
