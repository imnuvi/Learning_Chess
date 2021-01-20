import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';


// ht = document.getElementsByTagName('html')
document.body.style.backgroundColor = 'black';

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={ () => this.props.onClick() }>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares_array : Array(9).fill(null),
      xIsNext: true,
    };
  }

  resetBoard(){
    this.setState(
      {
        squares_array : Array(9).fill(null),
        xIsNext: true,
      }
    )
  }

  handleclick(i){
    const sq = this.state.squares_array.slice();
    if (calculateWinner(sq) || sq[i]) {
      return;
    }
    sq[i] = this.state.xIsNext ? 'X' : "O";
    this.setState({
      squares_array: sq,
      xIsNext : !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return ( <Square value={ this.state.squares_array[i] } onClick={() => this.handleclick(i) }/> );
  }

  restartButton(winner){

    if (winner){return(
        <div>
          <button onClick={() => this.resetBoard() }>restart</button>
        </div>
      )
    }
  }

  render() {

    const winner = calculateWinner(this.state.squares_array);
    let status;
    if (winner === "draw"){
      status = 'Game draw'
    }
    else if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        {this.restartButton(winner)}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // const a = lines[i][0];
    // const b = lines[i][1];
    // const c = lines[i][2];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  for (let j=0; j<9; j++){
    if (squares[j] === null){
      return null
    }
  }
  return "draw";
}



new Promise((resolve,reject) => {
  if (){
    resolve(array);
  }
  else{
    reject("error");
  }
})
