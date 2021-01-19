import React from 'react';
import ReactDOM from 'react-dom';

class Game extends React.Component {
  render() {
    return(
      <div className='Game'>
        <p>Hello world !</p>
      </div>
    );
  }
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
