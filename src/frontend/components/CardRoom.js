import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import counter from '../reducer/cardReducer';

import { getMessages, getTodos } from '../actions/actions';


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
      store: createStore(counter, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    }
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <Jumbotron style = {{textAlign: 'center'}}>The Game</Jumbotron>
        <Messager socket = {this.state.socket}/>
        <Cards />
      </Provider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMessages: () => dispatch(getMessages())
  };
};

export default connect(null, mapDispatchToProps)(CardRoom);
