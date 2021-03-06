import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
      marginTop: theme.spacing(9),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
  form: {
    width: '100%',
    textAlign: 'center',
    padding: theme.spacing(10),
    paddingBottom: theme.spacing(2),
    paddingTop: 0,
  },
  submit: {
    margin: theme.spacing(3),
    borderRadius: '16px',
    backgroundColor: "#FF9900",
    "&:hover": {
      background: '#cb7a00',
    }
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: '32px',
  },
  formTitle: {
    paddingTop: theme.spacing(10),
  },
}));