import React from 'react';
import { connect } from 'react-redux';

import Room from './Room';

class TLContainer extends React.Component {
  render() {
    return (
      <div>
        {this.props.reduxTLItems.map(tli => (
          <Room item={tli} />
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

export default connect(mapStateToProps)(TLContainer);
