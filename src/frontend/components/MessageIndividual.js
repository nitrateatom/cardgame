import React from 'react';
import { connect } from 'react-redux';

import { removeMessage } from '../actions/actions';

class MessageIndividual extends React.Component {
  render() {
    return (
      <div>
        <p>
          <b>{this.props.item.user}:</b>
          {this.props.item.messageVal}
          <button onClick={() => this.props.removeItem(this.props.item.id)}>
            X
          </button>
        </p>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeItem: msgId => dispatch(removeMessage(msgId))
  };
};

export default connect(null, mapDispatchToProps)(MessageIndividual);
