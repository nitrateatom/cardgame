import React from 'react';
import { connect } from 'react-redux';
import Card from './Card'
import '../styles/Cards.css'
import { updateDeck } from '../actions/actions';


class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: [],
      currentPair: [],
      guesses: 0,
      matchedCards: []
    };

    const suits = ["♠︎", "♥︎", "♣︎", "♦︎"];
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let card = [];

    for (let x = 0; x < suits.length; x++) {
      for (let y = 0; y < values.length; y++) {
        card = {suit: suits[x], val: values[y], flipped: true};
        this.state.deck.push(card);
      }
    };
    
    // this.handleF = this.handleF.bind(this);
    this.handleA = this.handleA.bind(this);
    this.handleNewPair = this.handleNewPair.bind(this);
    this.flipped = this.flipped.bind(this);
    if (this.props.ReduxDeck.length == 52) {
      this.state.deck = this.props.ReduxDeck;
    } else {
      this.shuffleCards(this.state.deck);
    }
  }
  
  shuffleCards(deck) {
    console.log('shuffling deck');

    for (var i = 0; i < 1000; i++)
    {
      var location1 = Math.floor((Math.random() * deck.length));
      var location2 = Math.floor((Math.random() * deck.length));
      var tmp = deck[location1];
      
      deck[location1] = deck[location2];
      deck[location2] = tmp;
    }
    // this.setState({deck: deck});
    this.props.updateDeck(deck);
    return deck;
  }


  flipped(card) {
    const { currentPair, matchedCards } = this.state
    const cardMatched = matchedCards.includes(card)

    if (currentPair.length < 2) {
      return cardMatched || card === currentPair[0] ? 'visible' : 'hidden'
    }

    if (currentPair.includes(card)) {
      return cardMatched ? 'justMatched' : 'justMismatched'
    }

    return cardMatched ? 'visible' : 'hidden'
  }

  handleA(card) {
    const { currentPair } = this.state

    if (currentPair.length === 2) {
      return
    }

    if (currentPair.length === 0) {
      this.setState({ currentPair: [card] })
      return
    }

    if (currentPair[0] === card) {
      return
    }

    this.handleNewPair(card);
  }

  handleNewPair(card) {
    const { currentPair, guesses, matchedCards } = this.state

    const newPair = [currentPair[0], card]
    const newGuesses = guesses + 1
    const matched = newPair[0].val === newPair[1].val
    this.setState({ currentPair: newPair, guesses: newGuesses })
    if (matched) {
      this.setState({ matchedCards: [...matchedCards, ...newPair] })
    }
    setTimeout(() => this.setState({ currentPair: [] }), 750)
  }
  
  render() {
    return (  
      <div>
        <button onClick={() => this.shuffleCards(this.state.deck)}>Shuffle</button>
        <div>Guesses: {this.state.guesses}</div>
        <div className="deck">
          {this.state.deck.map(card => <Card 
              card = {card}
              suit={card.suit} 
              value={card.val} 
              flipped = {this.flipped(card)}
              clickFunction = {this.handleA} />)
          }
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateDeck: deck => dispatch(updateDeck(deck)),
    getDeck: () => dispatch(getDeck())
  };
};

const mapStateToProps = state => {
  return {
    ReduxDeck: state
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);