import './static/css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { move, board_reset } from "./logic.js";

class Piece extends React.Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef();
    this.state = {
      piece_type: this.props.value,
      piece_position: [this.props.row,this.props.column],
      piece_width: 0,
      piece_height: 0,
      originalX: 0,
      originalY: 0,
      newX: 0,
      newY: 0,
      moving: false,
      changeStyle: ''
    };
  }

  componentDidMount(){
    const boundingBox = this.myRef.current.getBoundingClientRect()

    this.setState({
      originalX: boundingBox.left,
      originalY: boundingBox.top,
      newX: boundingBox.left,
      newY: boundingBox.top,
      piece_width: boundingBox.width,
      piece_height: boundingBox.height,
      moving: false
    });
  }

  handleMouseDown = (e) => {
    console.log(e);
    console.log(e.screenX,e.screenY);
    this.setState({
      newX: e.pageX,
      newY: e.pageY,
      changeStyle: `translate(${e.pageX-this.state.originalX-(this.state.piece_width/2)}px, ${e.pageY-this.state.originalY-(this.state.piece_height/2)}px)`,
      moving: true
    });
  }

  render(){
    return(
      <div id={this.props.id} row={this.props.row} column={this.props.column} className={ `piece ${this.props.value}${(this.state.moving)?(" dragged"):""}` } style={{ transform : this.state.changeStyle}} ref={this.myRef} onMouseDown={this.handleMouseDown}>
      </div>
    )
  }
}

class Square extends React.Component {
  render(){
    return(
      <div id={this.props.id} row={this.props.row} column={this.props.column} className={ `square ${((this.props.row+this.props.column)%2 === 0) ? "white-square" : "black-square"}` }>
        {this.props.children}
      </div>
    );
  }
}

class Board extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        board_data : board_reset(),
        isNext: 'white',
        flipped: true
    };
  }

  handleDrop = (e) => {
    let piece_type = e.dataTransfer.getData("piece_type");
    let start_row = parseInt(e.dataTransfer.getData("piece_row"));
    let start_column = parseInt(e.dataTransfer.getData("piece_column"));

    let end_row = parseInt(e.target.attributes.getNamedItem('row').value);
    let end_column = parseInt(e.target.attributes.getNamedItem('column').value);

    let start = [start_row,start_column];
    let end = [end_row,end_column];

    let isNext = (this.state.isNext === "white") ? "black" : "white";

    // console.log(move(start,end,piece_type,this.state.board_data));
    if (move(start,end,piece_type,this.state.board_data,this.state.isNext)){
      const changed_board = this.state.board_data.slice();
      changed_board[start_row][start_column] = null;
      changed_board[end_row][end_column] = piece_type;


      this.setState({
        board_data: changed_board,
        isNext: isNext
      });
    }

    e.preventDefault()
  }

  renderSquare(i,j){
    const piece = (this.state.board_data[i][j] != null) ? (<Piece id={`piece${i}${j}`} row={i} column={j} value={this.state.board_data[i][j]}/>) : (null);
    return(
      <Square  id={`${i}${j}`} key={i*10 + j} row={i} column={j} value={this.state.board_data[i][j]} updateMove={() => {this.updateMove(i,j)}}>
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
