import React from 'react';
import { connect } from 'react-redux';

import { enterRoom } from '../actions/actions';
import io from 'socket.io-client';

// const socket = io('localhost:3000')

class Room extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.item.taskname}
        <button onClick={() => this.props.enterRoom(this.props.item.taskname)}>
          Join Room
        </button>
        </p>
      </div>
    );
  }
}
//this.props.item.id
// const mapDispatchToProps = dispatch => {
//   return {
//     // implement enter room
//     enterRoom: room => {
//       var socket = io.connect();
//       socket.emit('join room', room);
//       socket.on('new user', res => console.log(res));
//       dispatch(enterRoom(socket))
//     }
//   };
// };

// export default connect(null, mapDispatchToProps)(Room);
export default connect(null, null)(Room);
