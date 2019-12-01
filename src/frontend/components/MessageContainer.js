import React from 'react';
import { connect } from 'react-redux';

import MessageIndividual from './MessageIndividual';
import Room from './Room';

class MessageContainer extends React.Component {
  
  render() {
    return (
      <div style = {{marginLeft: '30px'}}>
        {this.props.reduxTLItems.map(tli => (
          <MessageIndividual item={tli} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reduxTLItems: state
  };
};

export default connect(mapStateToProps)(MessageContainer);
