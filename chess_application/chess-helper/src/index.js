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

  join_row(row){
    let end_row = [];
    for (let i of row){
      end_row.push(<Square />)
    }
    end_row.shift(<p>hello there</p>)
    return end_row
  }

  renderBoard(){
    let dupe_data = this.state.board_data.slice();
    let mod_data = dupe_data.map((row) => {
      return this.join_row(row);
    })
    // dupe_data = dupe_data.map((row,i) => {
    //   return row.map((squ,j) => {
    //       return <Square />
    //     })
    // });
    // let mod_data = dupe_data.reduce((tot,row) => {
    //   return (
    //     <Square></Square>
    //   )
    // });
    return (
      <div>{mod_data}</div>
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
