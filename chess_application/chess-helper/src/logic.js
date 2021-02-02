

function kingMoves(position,piece,board){
  let king_list = [];
  let newx, newy;
  let oldx = position[0];
  let oldy = position[1];
  for (let i=-1; i<=1; i++){
    for (let j=-1; j<=1; j++){
      newx =  oldx + i;
      newy =  oldy + j;
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
  let oldx = position[0];
  let oldy = position[1];

  let tempval;
  tempval = ((piece.charAt(0) === 'b') ? 1 : -1 );

  if (oldx === 7  || oldx === 0){
    return [];
  }

  if (board[oldx+tempval][oldy] === null){
    pawn_list.push([oldx+tempval,oldy]);
  }

  if (tempval>0){
    if ((oldx === 1) && board[oldx+(2*tempval)][oldy] === null){
      pawn_list.push([oldx+(2*tempval),oldy]);
    }

    if ((oldy+1 <= 7) && (oldx+1 <= 7) && (board[oldx+1][oldy+1] != null) && (board[oldx+1][oldy+1].charAt(0) === 'w')){
      pawn_list.push([oldx+1,oldy+1]);
    }
    if ((oldy-1 >= 0) && (oldx+1 <= 7) && (board[oldx+1][oldy-1] != null) && (board[oldx+1][oldy-1].charAt(0) === 'w')){
      pawn_list.push([oldx+1,oldy-1]);
    }
  }

  if (tempval<0){
    if ((oldx === 6) && board[oldx+(2*tempval)][oldy] === null){
      pawn_list.push([oldx+(2*tempval),oldy]);
    }

    if ((oldy+1 <= 7) && (oldx-1 <= 7) && (board[oldx-1][oldy+1] != null) && (board[oldx-1][oldy+1].charAt(0) === 'b')){
      pawn_list.push([oldx-1,oldy+1]);
    }
    if ((oldy-1 >= 0) && (oldx-1 <= 7) && (board[oldx-1][oldy-1] != null) && (board[oldx-1][oldy-1].charAt(0) === 'b')){
      pawn_list.push([oldx-1,oldy-1]);
    }
  }

  return (pawn_list);
}


function rookhMoves(position,piece,board){
  let rookh_list = [];
  let oldx = position[0];
  let oldy = position[1];

  let top_branch = true;
  let bottom_branch = true;
  let left_branch = true;
  let right_branch = true;
  let friend = piece.charAt(0);
  let enemy = (friend === 'b') ? 'w' : 'b';


  for (let i=1; i<=7; i++){
    if (oldx+i <= 7 && bottom_branch){
       if (board[oldx+i][oldy] === null){
         rookh_list.push([oldx+i,oldy]);
       }
       else if (board[oldx+i][oldy].charAt(0) === enemy){
         rookh_list.push([oldx+i,oldy]);
         bottom_branch = false;
       }
       else if (board[oldx+i][oldy].charAt(0) === friend){
         bottom_branch = false;
       }
    }

    if (oldx-i >= 0 && top_branch){
      if (board[oldx-i][oldy] === null){
        rookh_list.push([oldx-i,oldy]);
      }
      else if (board[oldx-i][oldy].charAt(0) === enemy){
        rookh_list.push([oldx-i,oldy]);
        top_branch = false;
      }
      else if (board[oldx-i][oldy].charAt(0) === friend){
        top_branch = false;
      }
    }

    if (oldy+i <= 7 && right_branch){
      if (board[oldx][oldy+i] === null){
        rookh_list.push([oldx,oldy+i]);
      }
      else if (board[oldx][oldy+i].charAt(0) === enemy){
        rookh_list.push([oldx,oldy+i]);
        right_branch = false;
      }
      else if (board[oldx][oldy+i].charAt(0) === friend){
        right_branch = false;
      }
    }

    if (oldy-i >= 0 && left_branch){
      if (board[oldx][oldy-i] === null){
        rookh_list.push([oldx,oldy-i]);
      }
      else if (board[oldx][oldy-i].charAt(0) === enemy){
        rookh_list.push([oldx,oldy-i]);
        left_branch = false;
      }
      else if (board[oldx][oldy-i].charAt(0) === friend){
        left_branch = false;
      }
    }
  }
  return (rookh_list);
}


function bishopMoves(position,piece,board){
  let bishop_list = [];
  let oldx = position[0];
  let oldy = position[1];

  let br_branch = true;
  let tr_branch = true;
  let tl_branch = true;
  let bl_branch = true;
  let friend = piece.charAt(0);
  let enemy = (friend === 'b') ? 'w' : 'b';

  for (let i=1; i<=7; i++){
    if (oldx+i <= 7 && oldy+i <= 7 && br_branch){
      if (board[oldx+i][oldy+i] === null){
        bishop_list.push([oldx+i,oldy+i]);
      }
      else if (board[oldx+i][oldy+i].charAt(0) === enemy){
        bishop_list.push([oldx+i,oldy+i]);
        br_branch = false;
      }
      else if (board[oldx+i][oldy+i].charAt(0) === friend){
        br_branch = false;
      }
    }
    if (oldx-i >= 0 && oldy+i <= 7 && tr_branch){
      if (board[oldx-i][oldy+i] === null){
        bishop_list.push([oldx-i,oldy+i]);
      }
      else if (board[oldx-i][oldy+i].charAt(0) === enemy){
        bishop_list.push([oldx-i,oldy+i]);
        tr_branch = false;
      }
      else if (board[oldx-i][oldy+i].charAt(0) === friend){
        tr_branch = false;
      }
    }
    if (oldx+i <= 7 && oldy-i >= 0 && bl_branch){
      if (board[oldx+i][oldy-i] === null){
        bishop_list.push([oldx+i,oldy-i]);
      }
      else if (board[oldx+i][oldy-i].charAt(0) === enemy){
        bishop_list.push([oldx+i,oldy-i]);
        bl_branch = false;
      }
      else if (board[oldx+i][oldy-i].charAt(0) === friend){
        bl_branch = false;
      }
    }
    if (oldx-i >= 0 && oldy-i >= 0 && tl_branch){
      if (board[oldx-i][oldy-i] === null){
        bishop_list.push([oldx-i,oldy-i]);
      }
      else if (board[oldx-i][oldy-i].charAt(0) === enemy){
        bishop_list.push([oldx-i,oldy-i]);
        tl_branch = false;
      }
      else if (board[oldx-i][oldy-i].charAt(0) === friend){
        tl_branch = false;
      }
    }
  }
  return (bishop_list);
}

function checkEmpty(location,board){
  if (location[0] > 7 || location[1] > 7 || location[0] < 0 || location[1] < 0){
    return "out"
  }
  else if (board[location[0]][location[1]] === null){
    return "free"
  }
  else {
    return board[location[0]][location[1]].charAt(0);
  }
}

function knightMoves(position,piece,board){
  let knight_list = [];
  let oldx = position[0];
  let oldy = position[1];
  let friend = piece.charAt(0);
  let enemy = (friend === 'b') ? 'w' : 'b';

  let j;

  for (let i=1; i<=2; i++){
    j = ((i === 1) ? (2) : (1));
    if (checkEmpty([oldx+i,oldy+j],board) !== "out"){
      if (checkEmpty([oldx+i,oldy+j],board) === "free"){
        knight_list.push([oldx+i,oldy+j]);
      }
      else if (checkEmpty([oldx+i,oldy+j],board) === enemy){
        knight_list.push([oldx+i,oldy+j]);
      }
    }
    if (checkEmpty([oldx-i,oldy-j],board) !== "out"){
      if (checkEmpty([oldx-i,oldy-j],board) === "free"){
        knight_list.push([oldx-i,oldy-j]);
      }
      else if (checkEmpty([oldx-i,oldy-j],board) === enemy){
        knight_list.push([oldx-i,oldy-j]);
      }
    }
    if (checkEmpty([oldx-i,oldy+j],board) !== "out"){
      if (checkEmpty([oldx-i,oldy+j],board) === "free"){
        knight_list.push([oldx-i,oldy+j]);
      }
      else if (checkEmpty([oldx-i,oldy+j],board) === enemy){
        knight_list.push([oldx-i,oldy+j]);
      }
    }
    if (checkEmpty([oldx+i,oldy-j],board) !== "out"){
      if (checkEmpty([oldx+i,oldy-j],board) === "free"){
        knight_list.push([oldx+i,oldy-j]);
      }
      else if (checkEmpty([oldx+i,oldy-j],board) === enemy){
        knight_list.push([oldx+i,oldy-j]);
      }
    }
  }
  return (knight_list);
}

function queenMoves(position,piece,board){
  let queen_list = bishopMoves(position,piece,board);
  let rookh_moves = rookhMoves(position,piece,board);
  queen_list.push(...rookh_moves);

  return queen_list

}

// function validMoves(possible_moves,position){
//   let valid_moves_list = [];
//   let cury = position[0]
//   let curx = position[1]
//   let x;
//   let y;
//   let newx;
//   let newy;
//   for (let i=0; i<possible_moves.length; i++){
//     y = possible_moves[i][0];
//     x = possible_moves[i][1];
//     newx = curx + x;
//     newy = cury + y;
//     if (newx<0 || newx>7 || newy<0 || newy>7){
//       continue;
//     }
//     valid_moves_list.push([newy,newx]);
//   }
//   return valid_moves_list
// }

function move(start,end,piece,board){
  let move_list = [];

  if (piece === 'wki' || piece === 'bki'){
    move_list = kingMoves(start,piece,board);
  }
  if (piece === 'wpa' || piece === 'bpa'){
    move_list = pawnMoves(start,piece,board);
  }
  if (piece === 'wro' || piece === 'bro'){
    move_list = rookhMoves(start,piece,board);
  }
  if (piece === 'wbi' || piece === 'bbi'){
    move_list = bishopMoves(start,piece,board);
  }
  if (piece === 'wkn' || piece === 'bkn'){
    move_list = knightMoves(start,piece,board);
  }
  if (piece === 'wqu' || piece === 'bqu'){
    move_list = queenMoves(start,piece,board);
  }

  let string_moves = move_list.map((x) => {
    return x.reduce((val,summer) => {
      return val.toString() + summer;
    })
  })
  // console.log(string_moves)
  // console.log(piece);
  // console.log(move_list);
  // // console.log(end);

  let end_string = end[0].toString() + end[1].toString();

  // console.log(end_string);
  if (string_moves.includes(end_string)){
    return true;
  }
  else{
    return false;
  }

}


export { move };
