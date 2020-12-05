import React from 'react';
import { useSelector } from 'react-redux';
import Monitor from '../Monitor/Monitor';
import Login from '../Login/Login';
import { Button, AppBar, Toolbar } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../store/actions/auth';

const RootNavigator = ({ logout }) => {
  const auth = useSelector((state) => state.auth);
  const user = localStorage.getItem('user');

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {auth.isLoggedIn || user ? <Monitor /> : <Login />}
    </>
  );
};

RootNavigator.propTypes = {
  logout: PropTypes.func.isRequired,
};
export default connect(null, { logout })(RootNavigator);
