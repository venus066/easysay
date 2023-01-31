import FuseSearch from '@fuse/core/FuseSearch';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ChatPanelToggleButton from 'app/fuse-layouts/shared-components/chatPanel/ChatPanelToggleButton';
import NavbarToggleButton from 'app/fuse-layouts/shared-components/NavbarToggleButton';
import QuickPanelToggleButton from 'app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectToolbarTheme } from 'app/store/fuse/settingsSlice';
import AdjustFontSize from '../../shared-components/AdjustFontSize';
import FullScreenToggle from '../../shared-components/FullScreenToggle';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
import NotificationPanelToggleButton from '../../shared-components/notificationPanel/NotificationPanelToggleButton';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {motion} from "framer-motion";
import Icon from "@material-ui/core/Icon";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function ToolbarLayout2(props) {
  const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
  const toolbarTheme = useSelector(selectToolbarTheme);
  const login = useSelector(({ auth }) => auth.login);
  const classes = useStyles(props);

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
            <Link to="/apps/chat" role="button">
              <Tooltip
                  title="Chat to AI Bot"
                  placement='bottom'
              >
                <IconButton className="w-40 h-40 p-0">
                  <Icon>chat</Icon>
                </IconButton>
              </Tooltip>
            </Link>
            <Link to="/apps/rephrase" role="button">
              <Tooltip
                  title="Rephrase"
                  placement='bottom'
              >
                <IconButton className="w-40 h-40 p-0">
                  <Icon>edit</Icon>
                </IconButton>
              </Tooltip>
            </Link>

            <Link to="/" role="button">
              <Tooltip
                  title="paragraph"
                  placement='bottom'
              >
                <IconButton className="w-40 h-40 p-0">
                  <Icon>grading</Icon>
                </IconButton>
              </Tooltip>
            </Link>

            <Link to="/" role="button">
              <Tooltip
                  title="article"
                  placement='bottom'
              >
                <IconButton className="w-40 h-40 p-0">
                  <Icon>article</Icon>
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
