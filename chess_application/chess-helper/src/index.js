import './static/css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';

class Piece extends React.Component {
  constructor(props){
    super(props);
    this.myRef = React.createRef();
    this.state = {
      originalX: 0,
      originalY: 0,
      newX: 0,
      newY: 0,
    };
  }

  componentDidMount(){
    // console.log(`mounted piece ${this.props.value}`);
    // const bb = document.getElementById(`piece${this.props.id}`);
    // const boundingBox = bb.getBoundingClientRect()
    const boundingBox = this.myRef.current.getBoundingClientRect()
    // console.log(boundingBox.left,boundingBox.top);
    this.setState({
      originalX: boundingBox.left,
      originalY: boundingBox.top,
      newX: boundingBox.left,
      newY: boundingBox.top,
    });
  }

  pieceDragged = (e) => {
    // console.log(`dragged ${this.props.value}`);
    // console.log(this.state.originalX,this.state.originalY);
    // console.log(e.pageX,e.pageY);
    // this.myRef.style
    // console.log(`translate(${this.state.newX-this.state.originalX}px, ${this.state.newY-this.state.originalY}px)`);
     // style={{transform: `translate(${this.state.originalX+this.state.newX}px, ${this.state.originalY-this.state.newY}px)`}}
    this.setState({
      newX: e.pageX,
      newY: e.pageY,
    })
    // this.myRef.
  }

  pieceClicked(){
    console.log(`clicked ${this.props.value}`);
    this.props.pieceClicked()
  }

  mouseDowner = (e) => {
    console.log(`mouse downn ${e.pageX} ${e.pageY}`);
    console.log(`original ${this.state.originalX} ${this.state.originalY}`);
    this.setState({
      newX: e.pageX,
      newY: e.pageY,
    })
    // this.myRef.style.transform = `translate(${e.pageX-this.state.originalX}px, ${e.pageY-this.state.originalY}px)`;
  }

  styler(){
    let newX = this.state.newX;
    let newY = this.state.newY;
    let originalX = this.state.originalX;
    let originalY = this.state.originalY;

    let differenceX = (newX > originalX)? ((newX-originalX)) : (-(originalX-newX))

    return 'red'
  }

  render(){
    return(
      <div id={this.props.id} className={ `piece ${this.props.value}` } ref={this.myRef} style={{transform: `translate(${this.state.newX-this.state.originalX}px, ${this.state.newY-this.state.originalY}px)`}} onMouseDown={this.mouseDowner} >
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
