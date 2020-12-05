import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  btnGroup: {
    justifyContent: 'center',
    display: 'flex',
    marginTop: 15,
    marginLeft: '30%',
  },
  marginTop: {
    marginTop: 20,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  stopBtn: {
    marginLeft: 10,
  },
}));

export default useStyles;
