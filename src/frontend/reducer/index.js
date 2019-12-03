import {
  ADD_TODO_SUCCESS,
  GET_TODOS_SUCCESS,
  REMOVE_TODO_SUCCESS,
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
    case 'UPDATE_DECK':
      // stateCopy = action.deck;
      return action.deck;
  }
  return stateCopy;
};
