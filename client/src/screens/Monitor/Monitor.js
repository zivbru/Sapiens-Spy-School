import React, { useState, useEffect } from 'react';
import useStyles from './Styles';
import io from 'socket.io-client';
import {
  Container,
  TextField,
  Button,
  Typography,
  ButtonGroup,
  List,
  ListItem,
} from '@material-ui/core';
import { start, stop, insertLog } from '../../store/actions/logs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const ENDPOINT = 'http://localhost:5000';

const Monitor = ({ start, stop, insertLog, logs }) => {
  const classes = useStyles();
  const [dir, setDir] = useState('');

  const onStartClick = () => {
    if (!dir) {
      alert('You have to select a folder first!!');
      return;
    }
    start(dir);
  };
  const onStopClick = () => {
    stop();
  };

  useEffect(() => {
    const socket = io(ENDPOINT);

    socket.on('super event', function (data) {
      insertLog(data);
    });
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, [insertLog]);

  return (
    <Container component='main' maxWidth='xs' className={classes.marginTop}>
      <Typography component='h1' variant='h4' className={classes.btnGroup}>
        Monitor
      </Typography>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        label='Enter folder name'
        name='dir'
        value={dir}
        onChange={(e) => setDir(e.target.value)}
      />
      <ButtonGroup
        color='primary'
        aria-label='outlined primary button group'
        className={classes.btnGroup}
      >
        <Button
          variant='contained'
          color='primary'
          className={classes.startBtn}
          onClick={onStartClick}
        >
          Start
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.stopBtn}
          onClick={onStopClick}
        >
          Stop
        </Button>
      </ButtonGroup>
      {logs.length > 0 && (
        <List component='nav' aria-label='main mailbox folders'>
          {logs.map((log, index) => (
            <ListItem key={index}>{log}</ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

Monitor.propTypes = {
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  insertLog: PropTypes.func.isRequired,
  logs: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  logs: state.logs.logs,
});

export default connect(mapStateToProps, { start, stop, insertLog })(Monitor);
