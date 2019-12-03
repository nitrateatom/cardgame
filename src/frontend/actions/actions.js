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

export const addTodo = newTodo => {
  return dispatch => {
    axios
      .post('/api/todo', { todo: newTodo })
      .then(({ data }) => {
        dispatch({ type: ADD_TODO_SUCCESS, todos: data });
      })
      .catch(error => {
        dispatch({ type: ADD_TODO_FAILURE, error });
      });
  };
};

export const getTodos = () => {
  return dispatch => {
    axios
      .get('/api/todos')
      .then(({ data }) => {
        dispatch({ type: GET_TODOS_SUCCESS, todos: data });
      })
      .catch(error => {
        dispatch({ type: GET_TODOS_FAILURE, error });
      });
  };
};

export const removeTodo = todoId => {
  return dispatch => {
    axios
      .post('/api/remove_todo', { todoId })
      .then(({ data }) => {
        dispatch({ type: REMOVE_TODO_SUCCESS, todos: data });
      })
      .catch(error => {
        dispatch({ type: REMOVE_TODO_FAILURE, error });
      });
  };
};

export const addMessage = (user, newMsg) => {
  return dispatch => {
    // dispatch({ type: ADD_MSG_SUCCESS, message: newMsg })
    return axios
      .post('/api/addMsg', { user: user, message: newMsg })
      .then(({ data }) => {
        dispatch({ type: ADD_MSG_SUCCESS, messages: data });
      })
      .catch(error => {
        dispatch({ type: ADD_MSG_FAILURE, error });
      });
  };
};

export const getMessages = () => {
  return dispatch => {
    return axios
      .get('/api/messages')
      .then(({ data }) => {
        dispatch({ type: GET_MSGS_SUCCESS, messages: data });
      })
      .catch(error => {
        dispatch({ type: GET_MSGS_FAILURE, error });
      });
  };
};

export const removeMessage = msgId => {
  return dispatch => {
    return axios
      .post('/api/remove_message', { msgId })
      .then(({ data }) => {
        dispatch({ type: REMOVE_MSG_SUCCESS, messages: data });
      })
      .catch(error => {
        dispatch({ type: REMOVE_MSG_FAILURE, error });
      });
  };
};

export const updateDeck = deck => {
  return dispatch => {
    return dispatch({ type: 'UPDATE_DECK', deck: deck });
  };
};

