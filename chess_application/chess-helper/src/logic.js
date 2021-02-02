

function possibleMoves(piece){
  let possible_moves_list = [];
  if (piece === 'wki' || piece === 'bki'){
    for (let i=-1; i<2; i++){
      for (let j=-1; j<2; j++){
        if (i===0 && j===0){
          continue;
        }
        possible_moves_list.push([i,j]);
      }
    }
    return (possible_moves_list);
  }
}

function validMoves(possible_moves,position){
  let valid_moves_list = [];
  let cury = position[0]
  let curx = position[1]
  let x;
  let y;
  let newx;
  let newy;
  for (let i=0; i<possible_moves.length; i++){
    y = possible_moves[i][0];
    x = possible_moves[i][1];
    newx = curx + x;
    newy = cury + y;
    if (newx<0 || newx>7 || newy<0 || newy>7){
      continue;
    }
    valid_moves_list.push([newy,newx]);
  }
  return valid_moves_list
}

function move(start,end,piece){
  let possible_moves_list = possibleMoves(piece);
  let valid_moves_list = validMoves(possible_moves_list,[0,4]);
  console.log(valid_moves_list);
}


export { move };
