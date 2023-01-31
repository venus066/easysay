import AppBar from '@material-ui/core/AppBar';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {alpha} from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Rephrase from './Rephrase';
import reducer from './store';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import RephraseSidebar from "./RephraseSidebar";

const drawerWidth = 400;
const headerHeight = 200;

const useStyles = makeStyles((theme) => ({
  '@global': {
    '#fuse-main': {
      height: '100vh',
    },
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: '100%',
    position: 'relative',
    flex: '1 1 auto',
    height: 'auto',
    backgroundColor: theme.palette.background.default,
  },
  button: {
    margin: theme.spacing(1),
  },
  topBg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: headerHeight,
    backgroundImage: 'url("../../assets/images/backgrounds/header-bg.png")',
    backgroundColor: theme.palette.primary.dark,
    backgroundSize: 'cover',
    pointerEvents: 'none',
  },
  contentCardWrapper: {
    position: 'relative',
    padding: 24,
    maxWidth: 1400,
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    width: '100%',
    minWidth: '0',
    maxHeight: '100%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      padding: 16,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 12,
    },
  },
  contentCard: {
    display: 'flex',
    position: 'relative',
    flex: '1 1 100%',
    flexDirection: 'row',
    backgroundImage: 'url("/assets/images/patterns/rain-grey.png")',
    backgroundColor: theme.palette.background.paper,
    minHeight: 0,
    overflow: 'hidden',
  },
  drawerPaper: {
    width: drawerWidth,
    maxWidth: '100%',
    overflow: 'hidden',
    height: '100%',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 100%',
    zIndex: 10,
    background: `linear-gradient(to bottom, ${alpha(theme.palette.background.paper, 0.8)} 0,${alpha(
      theme.palette.background.paper,
      0.6
    )} 20%,${alpha(theme.palette.background.paper, 0.8)})`,
  },
  content: {
    display: 'flex',
    flex: '1 1 100%',
    minHeight: 0,
  },
}));

function RephraseApp(props) {
  const dispatch = useDispatch();
  const rephrase = useSelector(({ rephraseApp }) => rephraseApp);
  // const contacts = useSelector(selectContacts);
  const userSidebarOpen = useSelector(({ rephraseApp }) => rephraseApp.sidebars.userSidebarOpen);
  const contactSidebarOpen = useSelector(({ rephraseApp }) => rephraseApp.sidebars.contactSidebarOpen);
  const mobileChatsSidebarOpen = useSelector(({ rephraseApp }) => rephraseApp.sidebars.mobileChatsSidebarOpen);
  const classes = useStyles(props);

  useEffect(() => {
    // dispatch(getUserData());
    // dispatch(getContacts());
  }, [dispatch]);

  return (
    <div className={clsx(classes.root)}>
      <div className={classes.topBg} />

      <div className={clsx(classes.contentCardWrapper, 'container')}>
        <div className={clsx(classes.contentCard, 'shadow rounded-20')}>
          <main className={clsx(classes.contentWrapper, 'z-10')}>
            <AppBar className="w-full" elevation={0} position="static">
              <Toolbar className="px-16">
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<EditIcon />}
                >
                  Rephrase
                </Button>
              </Toolbar>
            </AppBar>

            <div className={classes.content}>
              <Rephrase className="flex flex-1 z-10" />
            </div>
          </main>

          <SwipeableDrawer
              className="h-full absolute z-20"
              variant="temporary"
              anchor="right"
              open={mobileChatsSidebarOpen}
              onOpen={(ev) => {}}
              onClose={() => dispatch(closeMobileChatsSidebar())}
              disableSwipeToOpen
              classes={{
                paper: clsx(classes.drawerPaper, 'absolute ltr:left-0 rtl:right-0'),
              }}
              style={{ position: 'absolute' }}
              ModalProps={{
                keepMounted: true,
                disablePortal: true,
                BackdropProps: {
                  classes: {
                    root: 'absolute',
                  },
                },
              }}
          >
            {/*<ChatsSidebar />*/}
          </SwipeableDrawer>

          <Hidden smDown>
            <Drawer
              className="h-full z-20"
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <RephraseSidebar />
            </Drawer>
          </Hidden>
          <SwipeableDrawer
              className="h-full absolute z-30"
              variant="temporary"
              anchor="right"
              open={userSidebarOpen}
              onOpen={(ev) => {}}
              onClose={() => dispatch(closeUserSidebar())}
              classes={{
                paper: clsx(classes.drawerPaper, 'absolute left-0'),
              }}
              style={{ position: 'absolute' }}
              ModalProps={{
                keepMounted: false,
                disablePortal: true,
                BackdropProps: {
                  classes: {
                    root: 'absolute',
                  },
                },
              }}
          >
            {/*<UserSidebar />*/}
          </SwipeableDrawer>
        </div>
      </div>
    </div>
  );
}

export default withReducer('rephraseApp', reducer)(RephraseApp);
