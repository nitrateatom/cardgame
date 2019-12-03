import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';

import { getMessages } from '../actions/actions';


import TLContainer from './TLContainer';
import Messager from './Messager';
import Cards from './Cards';

class CardRoom extends React.Component {
  constructor(props) {
    super(props);

    // Fetch todos from api server and initialize redux store
    this.props.getMessages();
    this.state = {
      socket: this.props.socket,
    }
  }

  render() {
    return (
      <div>
        <Jumbotron style = {{textAlign: 'center'}}>The Memory Game</Jumbotron>
        <Messager socket = {this.state.socket}/>
        <Cards />
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
