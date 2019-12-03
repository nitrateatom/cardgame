import React from 'react';
import '../styles/Cards.css'

const Card = (props) => {
  if (props.suit == "♣︎" || props.suit == "♠︎") {
    return (
    <div className={`card ${props.flipped} card-black`} key = {props} >
      <div onClick = {() => {
        console.log(props.value);
        props.clickFunction(props.card)
      }} >
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
    <div className={`card ${props.flipped} card-black`}  key = {props} onClick = {() => {
      console.log(props.value);
      props.clickFunction(props.card)
    }} >
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