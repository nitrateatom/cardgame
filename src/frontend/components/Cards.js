import React from 'react';
import { connect } from 'react-redux';
import Card from './Card'
import '../styles/Cards.css'

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: []
    };

    const suits = ["♠︎", "♥︎", "♣︎", "♦︎"];
    const values = ["A", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let card = [];

    for (let x = 0; x < suits.length; x++) {
      for (let y = 0; y < values.length; y++) {
        card = {suit: suits[x], val: values[y], flipped: true};
        this.state.deck.push(card);
      }
    };
    // this.handleF = this.handleF.bind(this);
    this.shuffleCards(this.state.deck);
  }
  
  shuffleCards(deck) {
    console.log('shuffling deck');

    for (var i = 0; i < 1000; i++)
    {
      var location1 = Math.floor((Math.random() * deck.length));
      var location2 = Math.floor((Math.random() * deck.length));
      var tmp = deck[location1];
``
      deck[location1] = deck[location2];
      deck[location2] = tmp;
    }
    // this.setState({deck: deck});
    return deck;
  }
  
  handleF() {
    console.log('hi');
  }
  
  render() {
    return (  
      <div>
        <button onClick={() => this.shuffleCards(this.state.deck)}>Shuffle</button>
        <div className="deck">
          {this.state.deck.map(function(card) {
            return (<Card 
              suit={card.suit} 
              value={card.val} 
              flipped = {card.flipped}
              onClick = {() => console.log('test')}/>)
          })}
        </div>
      </div>
    );
  }
};


export default Cards