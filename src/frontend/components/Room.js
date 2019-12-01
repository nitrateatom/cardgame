import React from 'react';
import { connect } from 'react-redux';

import { enterRoom } from '../actions/actions';

class Room extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.item.taskname}
        <button onClick={() => this.props.enterRoom()}>
          Join Room
        </button>
        </p>
      </div>
    );
  }
}
//this.props.item.id
const mapDispatchToProps = dispatch => {
  return {
    // implement enter room
    enterRoom: () => dispatch(enterRoom())
  };
};

export default connect(null, mapDispatchToProps)(Room);
