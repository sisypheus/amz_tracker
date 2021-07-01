import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';

const Auth = () => {
  const classes = useStyles();
  const [Signup, setSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit  = (e) => {
    e.preventDefault();
  };

  const handleChange = () => {
  
  };

  const handleShowPassword = () => {
    console.log('ici');
    setShowPassword((prev) => !prev)
  };

  const switchMode = () => {
    setSignup((prev) => !prev);
  };

  return (
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
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                  <Input name="firstName" label="First Name" handleChange={handleChange} half />
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
              <Input name="password" label="Password" handleChange={handleChange} type={ showPassword ? "text" : "password" } handleShowPassword={handleShowPassword}/>
              { Signup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              {Signup ? 'Sign up' : 'Sign in'}
            </Button>
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
  )
}

export default Auth
