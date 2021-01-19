import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';

class Square extends React.Component {
  render(){
    return(
      <div className='square'>
      </div>
    );
  }
}

class Board extends React.Component {
  render(){
    return(
      <div>
        <div>This is status</div>
      </div>
    )
  }
}

class Game extends React.Component {
  render() {
    return(
      <div className='Game'>
        <p>Hello world !</p>
        <Board />
      </div>
    );
  }
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
