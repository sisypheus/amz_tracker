import React, { useState, useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './Icon';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup, signin, googleSignup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const registerLoading = useSelector((state) => state.registerLoading);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState();
  const [result, setResult] = useState();
  const [Signup, setSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Signup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev)
  };

  const switchMode = () => {
    setSignup((prev) => !prev);
  };

  const googleSuccess = (res) => {
    setResult(res?.profileObj);
    setToken(res?.tokenId);
  };

  useEffect(() => {
    if (registerLoading == 2) {
      dispatch({ type: 'AUTH', data: { result, token } });
      history.push('/');
    } else if (registerLoading == -1) {
      console.log('error');
    }
  }, [registerLoading])

  useEffect(() => {
    async function register() {
      if (result && token) {
        try {
          dispatch(googleSignup(result));
          dispatch({ type: 'REGISTER_PENDING' })
        } catch (err) {
          dispatch({ type: 'REGISTER_FAILED' });
          console.log(err);
        }
      }
    }
    register();
  }, [result, token])

  const googleFailure = (error) => {
    console.log(error);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">{Signup ? 'Sign up' : 'Sign in'}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {Signup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
              {Signup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {Signup ? 'Sign up' : 'Sign in'}
            </Button>
            <GoogleLogin
              clientId="75263974421-9k199hrq6n7nrk8hk2h74sjo74mnb226.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
            />
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {Signup ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign up'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>

      <Snackbar open={open} onClose={handleClose} autoHideDuration={2000} >
        <Alert variant="filled" severity="error">
          Please use your browser to log in.
        </Alert>
      </Snackbar>
    </>
  )
}

export default Auth;