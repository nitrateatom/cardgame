import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { getMessages, getTodos } from '../actions/actions';


import TLContainer from './TLContainer';
import Messager from './Messager';
import MessageContainer from './MessageContainer';

class CardRoom extends React.Component {
  constructor(props) {
    super(props);

    // Fetch todos from api server and initialize redux store
    this.props.getMessages();
    // this.state = {
    //   socket: io.connect(),
    // }
    console.log('entered room');
  }

  render() {
    return (
      <div>
        <Jumbotron>Messages</Jumbotron>
        <MessageContainer 
        //socket = {this.state.socket}
        />
        <Messager 
        //socket = {this.state.socket}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMessages: () => dispatch(getMessages())
  };
};

export default connect(null, mapDispatchToProps)(CardRoom);
