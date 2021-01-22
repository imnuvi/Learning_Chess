import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';

import white_queen from './chess_icons/white_queen.png'
import black_queen from './chess_icons/black_queen.png'

class Square extends React.Component {
  render(){
    console.log(black_queen);
    let val = ((Math.random() > 0.5) ? white_queen : black_queen);
    console.log(val);
    return(
      <div className={ `square ${((this.props.row+this.props.column)%2 === 0) ? "white-square" : "black-square"}` } >
        <img alt="this is queen" src={val}></img>
      </div>
    );
  }
}

class Board extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        board_data : new Array(8).fill(null).map(() => new Array(8).fill(null))
    };
  }

  renderBoard(){
    let dupe_data = this.state.board_data.slice();
    // let mod_data = dupe_data.map((row,i) => {
    //
    // })
    return (
      <div className="Board">
        {dupe_data.map((row,i) => {
            return (
              <div className="board-row" key={i} row={i}>
                {row.map((block,j) => {
                  return <Square key={i*10 + j} row={i} column={j}/>;
                })}
              </div>
            );
        })}
      </div>
    );
  }

  render(){
    return(
      <div>
        <div>This is status</div>
        {this.renderBoard()}
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
