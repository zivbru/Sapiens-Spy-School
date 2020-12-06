import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Monitor from '../Monitor/Monitor';
import Login from '../Login/Login';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout, login } from '../../store/actions/auth';
import { stop } from '../../store/actions/logs';

const RootNavigator = ({ logout, login, stop }) => {
  const auth = useSelector((state) => state.auth);
  const user = localStorage.getItem('user');

  const logoutUSer = async () => {
    await stop();
    await logout();
  };

  if (user) {
    login(user.email, user.password);
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          {auth.isLoggedIn && (
            <Button color='inherit' onClick={logoutUSer}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {auth.isLoggedIn || user ? <Monitor /> : <Login />}
    </>
  );
};

RootNavigator.propTypes = {
  logout: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
};
export default connect(null, { logout, login, stop })(RootNavigator);
