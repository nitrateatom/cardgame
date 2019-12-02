import React from 'react';
import { connect } from 'react-redux';
import '../styles/Cards.css'

const Card = (props) => {
  var flipped = props.flipped;
  console.log(props);
  if (props.suit == "♣︎" || props.suit == "♠︎") {
    return (
    <div className="card card-black" key = {props} >
      <div onClick = {() => props.onClick()
      // {
      // flipped = !flipped;
      // console.log(flipped);
      // }
      } >
        <div className="card-tl">
          <div className="card-value">
            {props.value}
          </div>
          <div className="card-suit">
            {props.suit}
          </div>
        </div>
        <div className="card-br">
          <div className="card-value">
            {props.value}
          </div>
        <div className="card-suit">
          {props.suit}
        </div>
      </div>
      </div>
  </div>);
  } else {
    return (
    <div className="card card-red" key = {props}>
      <div className="card-tl">
        <div className="card-value">
          {props.value}
        </div>
        <div className="card-suit">
          {props.suit}
        </div>
      </div>
      <div className="card-br">
        <div className="card-value">
          {props.value}
        </div>
        <div className="card-suit">
          {props.suit}
        </div>
      </div>
    </div>);
  }
};

export default Card;