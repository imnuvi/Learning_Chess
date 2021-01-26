import './static/css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';

// import white_bishop from './chess_icons/white_bishop.png';
// import white_knight from './chess_icons/white_knight.png';
// import white_rookh from './chess_icons/white_rookh.png';
// import white_king from './chess_icons/white_king.png';
// import white_queen from './chess_icons/white_queen.png';
// import white_pawn from './chess_icons/white_pawn.png';
//
// import black_bishop from './chess_icons/black_bishop.png';
// import black_knight from './chess_icons/black_knight.png';
// import black_rookh from './chess_icons/black_rookh.png';
// import black_king from './chess_icons/black_king.png';
// import black_queen from './chess_icons/black_queen.png';
// import black_pawn from './chess_icons/black_pawn.png';


class Square extends React.Component {
  render(){

    const piece = (this.props.value != null) ? (<div className={ `piece ${this.props.value}`} onClick={() => {console.log(`clicked ${this.props.value} ${this.props.id} ${this.props.row}`)}}></div>) : (null);

    return(
      <div className={ `square ${((this.props.row+this.props.column)%2 === 0) ? "white-square" : "black-square"}` } >
          {piece}
      </div>
    );
  }
}

class Board extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        board_data : new Array(8).fill(null).map(() => new Array(8).fill("bro"))
    };
  }

  renderBoard(){
    let dupe_data = this.state.board_data.slice();
    return (
      <div className="Board">
        {dupe_data.map((row,i) => {
            return (
              <div className="board-row" key={i} row={i}>
                {row.map((block,j) => {
                  return <Square  key={i*10 + j} id={i*10 + j} row={i} column={j} value={this.state.board_data[i][j]}/>;
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
