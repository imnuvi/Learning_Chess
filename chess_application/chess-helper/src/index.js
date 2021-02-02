import './static/css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';

class Piece extends React.Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef();
    this.state = {
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

  pieceDragged = (e) => {
      this.setState({
      newX: e.pageX,
      newY: e.pageY,
    })
  }

  pieceClicked(){
    console.log(`clicked ${this.props.value}`);
    this.props.pieceClicked()
  }

  mouseDowner = (e) => {
    // console.log(`mouse downn ${e.pageX} ${e.pageY}`);
    // console.log(`original ${this.state.originalX} ${this.state.originalY}`);
    this.setState({
      newX: e.pageX,
      newY: e.pageY,
      changeStyle: `translate(${e.pageX-this.state.originalX-(this.state.piece_width/2)}px, ${e.pageY-this.state.originalY-(this.state.piece_height/2)}px)`,
      moving: true
    })
    // this.myRef.style.transform = `translate(${e.pageX-this.state.originalX}px, ${e.pageY-this.state.originalY}px)`;
  }

  mouseMover = (e) => {
    if (this.state.moving === true){
      this.setState({
        newX: e.pageX,
        newY: e.pageY,
        changeStyle: `translate(${e.pageX-this.state.originalX-(this.state.piece_width/2)}px, ${e.pageY-this.state.originalY-(this.state.piece_height/2)}px)`
      })
    }

  }

  mouseUpper = (e) => {
    this.setState({
      newX: this.state.originalX,
      newY: this.state.originalY,
      changeStyle: '',
      moving: false
    })
  }

  handleDrag = (e) => {
    e.preventDefault()
    if (this.state.moving === true){
      this.setState({
        newX: e.pageX,
        newY: e.pageY,
        changeStyle: `translate(${e.pageX-this.state.originalX-(this.state.piece_width/2)}px, ${e.pageY-this.state.originalY-(this.state.piece_height/2)}px)`
      })
    }

  }

  handleDragStart = (e) => {
    // e.dataTransfer.setData("text/plain",["hello im the dragged message","this is another", "and another"]);
    e.dataTransfer.setData("piece_type",`${this.props.value}`);
    e.dataTransfer.setData("piece_row",`${this.props.row}`);
    e.dataTransfer.setData("piece_column",`${this.props.column}`);
    // e.dataTransfer.setData("piece_type",`${this.props.value}`);
  }

  render(){
    return(
      <div id={this.props.id} row={this.props.row} column={this.props.column} className={ `piece ${this.props.value}${(this.state.moving)?(" dragged"):""}` } ref={this.myRef} style={{transform: this.state.changeStyle}} draggable='true' onDragStart={this.handleDragStart} onDrop={this.props.onDrop}>
      </div>
    )
  }
}

class Square extends React.Component {
  render(){
    return(
      <div id={this.props.id} row={this.props.row} column={this.props.column} className={ `square ${((this.props.row+this.props.column)%2 === 0) ? "white-square" : "black-square"}` }  onDragOver={this.props.onDragOver} onDrop={this.props.onDrop}>
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

fresh_board = board_reset(fresh_board);

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

  handleDragOver = (e) => {

    e.preventDefault();
  }

  handleDrop = (e) => {
    console.log(e.dataTransfer.getData("piece_type"));
    console.log(e.dataTransfer.getData("piece_row"));
    console.log(e.dataTransfer.getData("piece_column"));
    console.log(e.target.attributes.getNamedItem('row').value);

    let piece_type = e.dataTransfer.getData("piece_type");
    let start_row = parseInt(e.dataTransfer.getData("piece_row"));
    let start_column = parseInt(e.dataTransfer.getData("piece_column"));

    let end_row = parseInt(e.target.attributes.getNamedItem('row').value);
    let end_column = parseInt(e.target.attributes.getNamedItem('column').value);

    const changed_board = this.state.board_data.slice();
    changed_board[end_row][end_column] = piece_type;

    this.setState({
      board_data: changed_board
    });

    console.log(start_row,start_column);
    // this.state.board_data
    e.preventDefault()
  }

  renderSquare(i,j){
    const piece = (this.state.board_data[i][j] != null) ? (<Piece id={`piece${i}${j}`} row={i} column={j} value={this.state.board_data[i][j]}  pieceClicked={() => {this.pieceClicked(i,j)}} onDrop={this.handleDrop} />) : (null);
    return(
      <Square  id={`${i}${j}`} key={i*10 + j} row={i} column={j} value={this.state.board_data[i][j]} updateMove={() => {this.updateMove(i,j)}} onDrop={this.handleDrop} onDragOver={this.handleDragOver}>
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
