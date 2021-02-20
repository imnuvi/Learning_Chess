import './static/css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { move, board_reset } from "./logic.js";

let piece_width = 100;
let piece_height = 100;

class Piece extends React.Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef();
    this.state = {
      piece_type: this.props.value,
      piece_position: [this.props.row,this.props.column],
      piece_width: piece_width,
      piece_height: piece_height,
      originalX: 0,
      originalY: 0,
      newX: 0,
      newY: 0,
      moving: false,
      changeStyle: `translate(0px, 0px)`
    };
  }

  componentDidMount(){
    const boundingBox = this.myRef.current.getBoundingClientRect()

    let origX = boundingBox.left;
    let origY = boundingBox.top;

    this.setState({
      originalX: origX,
      originalY: origY,
      newX: boundingBox.left,
      newY: boundingBox.top,
      piece_width: boundingBox.width,
      piece_height: boundingBox.height,
      moving: false,
      changeStyle: `translate(0px, 0px)`,
    });
    //
    // this.setState({
    //   originalX: boundingBox.left,
    //   originalY: boundingBox.top,
    //   newX: boundingBox.left,
    //   newY: boundingBox.top
    // });
  }

  handleMouseDown = (e) => {
    console.log(e);
    console.log(e.screenX,e.screenY);
    let devX = e.pageX;
    let devY = e.pageY;
    console.log(devX,devY);
    this.setState({
      changeStyle: `translate(${devX-this.state.originalX-(this.state.piece_width/2)}px, ${devY-this.state.originalY-(this.state.piece_height/2)}px)`,
    });
  }

  handleMouseUp = (e) => {
    let devX = e.pageX;
    let devY = e.pageY;
    this.setState({
      changeStyle: `translate(0px, 0px)`,
    })
  }

  render(){
    return(
      <div ref={this.myRef} id={this.props.id} row={this.props.row} column={this.props.column} className={ `piece ${this.props.value}${(this.state.moving)?(" dragged"):""}` } style={{ transform : this.state.changeStyle}} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
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

  renderPieces(){
    let dupe_data = this.state.board_data.slice();
    let piece_list = [];
    for (let i=0; i<dupe_data.length; i++){
      for (let j=0; j<dupe_data[0].length; j++){
        if (dupe_data[i][j] === null) {
          continue;
        }
        else{
          piece_list.push(<Piece id={`piece ${i}${j}`} key={`piece ${i}${j}`} row={i} column={j} value={this.state.board_data[i][j]}/>);
        }
    }};
    return(
      <div className="Pieces">
        {piece_list}
      </div>
    );
  }

  renderSquare(i,j){
    const piece = (this.state.board_data[i][j] != null) ? (<Piece id={`piece${i}${j}`} row={i} column={j} value={this.state.board_data[i][j]}/>) : (null);
    return(
      <Square id={`${i}${j}`} key={i*10 + j} row={i} column={j} value={this.state.board_data[i][j]} updateMove={() => {this.updateMove(i,j)}}>
        {piece}
      </Square>

    );
  }

  renderBoard(){
    let dupe_data = this.state.board_data.slice();
    let square_list = []
    let piece_list = []
    for(let i=0; i<dupe_data.length; i++){
      for(let j=0; j<dupe_data[0].length; j++){
        if (dupe_data[i][j] === null) {
          continue;
        }
        else{
          piece_list.push(<Piece id={`piece ${i}${j}`} key={`piece ${i}${j}`} row={i} column={j} value={this.state.board_data[i][j]}/>);
        }
      }
    }
    for(let i=0; i<dupe_data.length; i++){
      for(let j=0; j<dupe_data[0].length; j++){
        square_list.push(this.renderSquare(i,j))
      }
    }
    return (
      <div className="Board">
        {square_list}
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
        <Board />
      </div>
    );
  }
}

class PieceBoard extends React.Component {

}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
