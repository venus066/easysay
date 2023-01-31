import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { makeStyles } from '@material-ui/core/styles';
import Logo from 'app/fuse-layouts/shared-components/Logo';
import clsx from 'clsx';
import { memo } from 'react';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },

  button: {
      margin: theme.spacing(1),
  }
}));

function NavbarLayout2(props) {
  const classes = useStyles(props);
  const login = useSelector(({ auth }) => auth.login);

  return (
    <div className={clsx('w-full shadow-md', classes.root, props.className)}>
      <div
        className={clsx(
          'flex flex-auto justify-between items-center w-full h-full container p-0 lg:px-24 z-20'
        )}
      >
        <div className="flex flex-shrink-0 items-center px-8">
          <Logo />
        </div>

        <FuseScrollbars className="flex h-full items-center button-group">
          {login.success === true?
              (<Link to="/upgrade" role="button">
                <Button variant="contained" color="primary" className={classes.button}>
                  Upgrade
                </Button>
              </Link>)
          :(
            <>
              <Link to="/register" role="button">
                <Button variant="contained" color="secondary" className={classes.button}>
                  Sign Up
                </Button>
              </Link>
              <Link to="/login" role="button">
                <Button variant="contained" color="secondary" className={classes.button}>
                  Sign In
                </Button>
              </Link>
            </>
            )
          }

        </FuseScrollbars>

      </div>
    </div>
  );
}

export default memo(NavbarLayout2);
