import React from 'react';
import { connect } from 'react-redux';
import { ADD_TODO_SUCCESS } from '../actions/types';
import { addMessage, removeMessage, getMessages } from '../actions/actions';
import axios from 'axios';
import MessageContainer from './MessageContainer';
import { Table } from 'react-bootstrap'

class Messager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      value: '',
      user: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    // console.log('messager props: ', this.props.reduxTLItems);
  }
  // get user
  checkLoginStatus() {
    axios.get('/getUser').then(
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
    // console.log('messager will mount props: ', this.props.reduxTLItems);
    this.props.socket.on('send message', message => {
      message.key = JSON.stringify(message)
      this.setState((prevState) => {
        let messages = prevState.messages;
        messages.push(message);
        {
          messages: messages
        }
      })
      // this.props.getItems();
      // this.props.addItem(message.name, message.msg);
      this.forceUpdate();
    })
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
            onClick={e => this.handleSubmit(e)}>
            Send
          </button>
        </form>
        <MessageContainer messages = {this.state.messages}/>
      </div>
    );
  }

  componentWillUnmount() {
    this.props.socket.close()
  }

  handleSubmit(event) {
    // console.log('messager handle submit props: ', this.props.reduxTLItems);
    event.preventDefault();
    // this.props.addItem(this.state.user, this.state.value);
    this.props.socket.emit('send message', {
      name: this.state.user,
      msg: this.state.value,
      //timestamp: new Date().toISOString()
    })
    this.setState({
      value: ''
    })
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItem: (user, msg) => dispatch(addMessage(user, msg)),
    removeItem: msgId => dispatch(removeMessage(msgId)),
    getItems: () => dispatch(getMessages()),
  };
};

const mapStateToProps = state => {
  return {
    reduxTLItems: state
  };
};

export default connect(null, mapDispatchToProps)(Messager);
