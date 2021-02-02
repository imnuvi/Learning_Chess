

function kingMoves(position,piece,board){
  let king_list = [];
  let newx, newy;
  let oldx = position[0];
  let oldy = position[1];
  let cur_piece;
  for (let i=-1; i<=1; i++){
    for (let j=-1; j<=1; j++){
      newx =  oldx + i;
      newy =  oldy + j;
      // cur_piece = board[newx][newy];
      if ((i===0 && j===0) || (newx < 0) || (newx > 7) || (newy < 0) || (newy > 7) || ((board[newx][newy] != null) && (board[newx][newy].charAt(0) === piece.charAt(0))) ){
        continue;
      }
      king_list.push([newx,newy]);
    }
  }

  return (king_list);
}

function pawnMoves(position,piece,board){
  let pawn_list = [];
  let newx, newy;
  let oldx = position[0];
  let oldy = position[1];
  if (piece.charAt(0) === 'b' && oldx === 1){

  }
  if (piece.charAt(0) === 'w' && oldx === 6){

  }

  return (pawn_list);
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

function move(start,end,piece,board){
  if (piece === 'wki' || piece === 'bki'){
    console.log(kingMoves(start,piece,board));
  }
  // let startx,starty;
  // starty = start[0];
  // startx = start[1];
  // let possible_moves_list = possibleMoves(piece);
  // let valid_moves_list = validMoves(possible_moves_list,[startx,starty]);
  // console.log(valid_moves_list);
}


export { move };
