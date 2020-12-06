import React, { useState } from 'react';
import useStyles from './Styles';
import { login, loginWithGoogle } from '../../store/actions/auth';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Typography, TextField, Button } from '@material-ui/core';

const Login = ({ login, loginWithGoogle }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const responseGoogle = async (res) => {
    await loginWithGoogle(res);
  };
  const onFail = (res) => {
    return;
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Email Address'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Container className={classes.googleLogin}>
            <GoogleLogin
              clientId='607326949972-maprpiod3v3tbevk0os17rrhso12hvar.apps.googleusercontent.com'
              buttonText='Sign in with Google'
              onSuccess={responseGoogle}
              onFailure={onFail}
              // isSignedIn={true}
              cookiePolicy={'single_host_origin'}
            />
          </Container>
        </form>
      </div>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loginWithGoogle: PropTypes.func.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login, loginWithGoogle })(Login);
