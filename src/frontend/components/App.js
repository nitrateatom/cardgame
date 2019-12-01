import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getTodos } from '../actions/actions';

import TLActions from './TLActions';
import TLContainer from './TLContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    // Fetch todos from api server and initialize redux store
    this.props.getTodos();
    this.state = {
      user: ''
    };
  }

  checkLoginStatus() {
    axios.get('/login').then(
      (response) => {
        if (response.headers.user) {
          this.setState({user: response.headers.user});
        }
    }).catch(
      error => console.log('error', error)
    );
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    return (
      <div>
        <h1>Groceries</h1>
        <TLContainer />
        <TLActions />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTodos: () => dispatch(getTodos())
  };
};

export default connect(null, mapDispatchToProps)(App);
