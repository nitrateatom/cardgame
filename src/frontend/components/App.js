import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getTodos } from '../actions/actions';

import TLActions from './TLActions';
import TLContainer from './TLContainer';
import CardRoom from './CardRoom';
import io from 'socket.io-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    // Fetch todos from api server and initialize redux store
    this.props.getTodos();
    this.state = {
      user: '',
      room: '',
      socket: '',
    };
    this.enterRoom = this.enterRoom.bind(this);
  }

  getUser() {
    axios.get('/getUser').then(
      (response) => {
        if (response.headers.user) {
          this.setState({user: response.headers.user});
        }
    }).catch(
      error => console.log('error', error)
    );
  }

  enterRoom(room) {
    var socket = io.connect();
    socket.emit('join room', room);
    socket.on('new user', res => console.log(res));
    this.setState({room: room, socket: socket});
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    if (this.state.room === '') {
      return (
      <div style = {{
        maxWidth: '300px',
        margin: '0 auto'
      }}>
        <h1>Rooms</h1>
        <TLContainer enterRoom = {this.enterRoom}/>
        <TLActions />
      </div>);
    } else {

      return (<CardRoom socket = {this.state.socket}/>);
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTodos: () => dispatch(getTodos())
  };
};

export default connect(null, mapDispatchToProps)(App);
