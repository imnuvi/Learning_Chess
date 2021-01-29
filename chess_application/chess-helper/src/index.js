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


class Piece extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      originalX: 0,
      originalY: 0
    };
  }

  componentDidMount(){
    // console.log(`mounted piece ${this.props.value}`);
    const bb = document.getElementById(`piece${this.props.id}`);
    // const boundingBox = bb.getBoundingClientRect()
    this.setState = {
      originalX: 0,
      originalY:0
    };
    console.log(bb);
  }

  pieceDragged = (e) => {
    // console.log(`dragged ${this.props.value}`);
    console.log(e);


    // this.props.updateMove()
  }

  pieceClicked(){
    console.log(`clicked ${this.props.value}`);
    this.props.pieceClicked()
  }

  render(){
    return(
      <div id={this.props.id} className={ `piece ${this.props.value}` } draggable='true' onClick={() => this.pieceClicked()} onDrag={this.pieceDragged} >
      </div>
    )
  }
}

class Square extends React.Component {
  render(){

    return(
      <div id={this.props.id} className={ `square ${((this.props.row+this.props.column)%2 === 0) ? "white-square" : "black-square"}` } >
        {this.props.children}
      </div>
    );
  }
}



let fresh_board = new Array(8).fill(null).map(() => new Array(8).fill("bbi"));

function board_reset(board){
  let newb = new Array(8).fill(null).map(() => new Array(8).fill(null));
  for (let i=0; i<board.length; i++){
    for (let j=0; j<board[0].length; j++){
      if (i===1){
        newb[i][j] = "bpa";
      }
      if (i===6){
        newb[i][j] = "wpa";
      }
      if (j===0 || j===7){
        if (i===0){
          newb[i][j] = "bro";
        }
        else if (i===7){
          newb[i][j] = "wro";
        }
      }

      if (j===1 || j===6){
        if (i===0){
          newb[i][j] = "bkn";
        }
        else if (i===7){
          newb[i][j] = "wkn";
        }
      }

      if (j===2 || j===5){
        if (i===0){
          newb[i][j] = "bbi";
        }
        else if (i===7){
          newb[i][j] = "wbi";
        }
      }

      if (j===3){
        if (i===0){
          newb[i][j] = "bqu";
        }
        else if (i===7){
          newb[i][j] = "wqu";
        }
      }

      if (j===4){
        if (i===0){
          newb[i][j] = "bki";
        }
        else if (i===7){
          newb[i][j] = "wki";
        }
      }

    }
  }
  return newb
}

fresh_board = board_reset(fresh_board)

class Board extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        board_data : fresh_board
    };
  }

  pieceClicked(i,j){
    const changed_board = this.state.board_data.slice();
    console.log(`clicked ${i} ${j}`);
    changed_board[i][j] = "wki";
    this.setState({
      board_data: changed_board
    });
  }

  updateMove(i,j){
    const changed_board = this.state.board_data.slice();
    console.log(`clicked ${i} ${j}`);
    changed_board[i][j] = "wkn";
    this.setState({
      board_data: changed_board
    });

  }

  renderSquare(i,j){
    const piece = (this.state.board_data[i][j] != null) ? (<Piece id={`piece${i}${j}`} value={this.state.board_data[i][j]}  updateMove={() => {this.updateMove(i,j)}} pieceClicked={() => {this.pieceClicked(i,j)}}/>) : (null);
    return(
      <Square  id={`${i}${j}`} key={i*10 + j} row={i} column={j} value={this.state.board_data[i][j]} >
          {piece}
      </Square>

    );
  }

  renderBoard(){
    let dupe_data = this.state.board_data.slice();
    return (
      <div className="Board">
        {dupe_data.map((row,i) => {
            return (
              <div className="board-row" key={i} row={i}>
                {row.map((block,j) => {
                  return this.renderSquare(i,j);
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
