import React from 'react';
import { useSelector } from 'react-redux';
import Monitor from '../Monitor/Monitor';
import Login from '../Login/Login';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../store/actions/auth';
import { stop } from '../../store/actions/logs';

const RootNavigator = ({ logout, stop }) => {
  const auth = useSelector((state) => state.auth);
  const user = localStorage.getItem('user');
  const googleUser = localStorage.getItem('google-user');

  const logoutUSer = async () => {
    await stop();
    await logout();
  };

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          {(auth.isLoggedIn || user || googleUser) && (
            <Button color='inherit' onClick={logoutUSer}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {auth.isLoggedIn || user || googleUser ? <Monitor /> : <Login />}
    </>
  );
};

RootNavigator.propTypes = {
  logout: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
};
export default connect(null, { logout, stop })(RootNavigator);
