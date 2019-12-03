import React from 'react';
import { connect } from 'react-redux';

// const socket = io('localhost:3000')

class Room extends React.Component {
  render() {
    return (
      <div style ={{padding: '1px'}}>
        <span style = {{paddingRight: '5px'}}>{this.props.item.taskname}</span>
        <button 
          onClick={() => this.props.enterRoom(this.props.item.taskname)}
          className = 'btn btn-info'>
          Join Room
        </button>
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
