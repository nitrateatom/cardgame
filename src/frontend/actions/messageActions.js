import axios from 'axios';
import {
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAILURE,
  REMOVE_TODO_SUCCESS,
  REMOVE_TODO_FAILURE,

  ADD_MSG_SUCCESS,
  ADD_MSG_FAILURE,
  GET_MSGS_SUCCESS,
  GET_MSGS_FAILURE,
  REMOVE_MSG_SUCCESS,
  REMOVE_MSG_FAILURE
} from './types';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import CardRoom from '../components/CardRoom';
import reducer from '../reducer/index';
import io from 'socket.io-client';

const socket = io.connect();

function message(msg, cb) {
  socket.emit('send message', { msg: msg }, cb);
}

function newMessage(msg, cb) {
  socket.on('new message', function(data) {
    console.log(data);
  });
}

export default {
  message,
  newMessage
}