const deckReducer = (state = [], action) => {
  let stateCopy = state.slice();
  switch (action.type) {
    case 'UPDATE_DECK':
      return action.deck;
    case 'GET_DECK':
      return action.deck;
  }
  return stateCopy;
}

export default deckReducer;