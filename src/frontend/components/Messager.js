import React from 'react';
import { connect } from 'react-redux';
import { ADD_TODO_SUCCESS } from '../actions/types';
import { addMessage } from '../actions/actions';
import axios from 'axios';
import { messages } from '../actions/messageActions';

class Messager extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.socket);
    this.state = {
      value: '',
      user: '',
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
      <div className = 'col-md-4'>
        <div className = 'chat' classID = 'chat'></div>
        <form classID = 'messageForm'>
          <input
            className = 'form-control'
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
          />
          <button className = 'btn btn-primary' 
            onClick={e => {
              e.preventDefault();
              this.props.addItem(this.state.user, this.state.value);
              this.setState({ value: ''});
              }}>
            Send
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItem: (user, msg) => dispatch(addMessage(user, msg))
  };
};

export default connect(null, mapDispatchToProps)(Messager);
