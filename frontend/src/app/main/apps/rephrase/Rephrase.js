import FuseScrollbars from '@fuse/core/FuseScrollbars';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import {selectRephrase} from './store/rephraseSlice';
import {Controller, useForm} from "react-hook-form";
import WYSIWYGEditor from "../../../shared-components/WYSIWYGEditor";


const useStyles = makeStyles((theme) => ({
  messageRow: {
    '&.contact': {
      '& .bubble': {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.getContrastText(theme.palette.background.paper),
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        '& .time': {
          marginLeft: 12,
        },
      },
      '&.first-of-group': {
        '& .bubble': {
          borderTopLeftRadius: 20,
        },
      },
      '&.last-of-group': {
        '& .bubble': {
          borderBottomLeftRadius: 20,
        },
      },
    },
    '&.me': {
      paddingLeft: 40,

      '& .avatar': {
        order: 2,
        margin: '0 0 0 16px',
      },
      '& .bubble': {
        marginLeft: 'auto',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        '& .time': {
          justifyContent: 'flex-end',
          right: 0,
          marginRight: 12,
        },
      },
      '&.first-of-group': {
        '& .bubble': {
          borderTopRightRadius: 20,
        },
      },

      '&.last-of-group': {
        '& .bubble': {
          borderBottomRightRadius: 20,
        },
      },
    },
    '&.contact + .me, &.me + .contact': {
      paddingTop: 20,
      marginTop: 20,
    },
    '&.first-of-group': {
      '& .bubble': {
        borderTopLeftRadius: 20,
        paddingTop: 13,
      },
    },
    '&.last-of-group': {
      '& .bubble': {
        borderBottomLeftRadius: 20,
        paddingBottom: 13,
        '& .time': {
          display: 'flex',
        },
      },
    },
  },
}));

function Rephrase(props) {
  const dispatch = useDispatch();
  const candidates = useSelector(({ rephraseApp }) => rephraseApp.rephrase.candidates);

  const classes = useStyles(props);

  const {control } = useForm({
  });
  console.log('control:', control);

  return (
      <div className={clsx('flex flex-col relative', props.className)}>
      <FuseScrollbars className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex flex-col flex-1">
          <div className="flex flex-col flex-1 items-center">
            <Controller
                className=""
                render={({ field }) => <WYSIWYGEditor {...field} />}
                name="message"
                control={control}
            />
          </div>
        </div>
      </FuseScrollbars>
    </div>
  );
}

export default Rephrase;
