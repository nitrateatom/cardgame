import {
  ADD_TODO_SUCCESS,
  GET_TODOS_SUCCESS,
  REMOVE_TODO_SUCCESS,
  ADD_MSG_SUCCESS,
  GET_MSGS_SUCCESS,
  REMOVE_MSG_SUCCESS
} from '../actions/types';

export default (state = [], action) => {
  let stateCopy = state.slice();
  // let stateCopy = Object.assign({}, state);
  switch (action.type) {
    case GET_TODOS_SUCCESS:
      return action.todos;
    case ADD_TODO_SUCCESS:
      return action.todos;
    case REMOVE_TODO_SUCCESS:
      return action.todos;
    case GET_MSGS_SUCCESS:
      return action.messages;
    case ADD_MSG_SUCCESS:
      return action.messages;
    case REMOVE_MSG_SUCCESS:
      return action.messages;
    case 'UPDATE_DECK':
      console.log('reducer: ', action);
      // stateCopy = action.deck;
      return action.deck;
  }
  return stateCopy;
};
