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
      <div>
        {dupe_data.map((row,i) => {
            return (
              <div className="board-row">
                {row.map((block,j) => {
                  return <Square />;
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
