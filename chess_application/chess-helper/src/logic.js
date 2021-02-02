

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
  let newx, newy;
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
  let newx, newy;
  let oldx = position[0];
  let oldy = position[1];

  let tl_branch = true;
  let tr_branch = true;
  let bl_branch = true;
  let br_branch = true;
  let friend = piece.charAt(0);
  let enemy = (friend === 'b') ? 'w' : 'b';

  for (let i=1; i<=7; i++){

  }





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
  if (piece === 'wki' || piece === 'bki'){
    console.log(kingMoves(start,piece,board));
  }
  if (piece === 'wpa' || piece === 'bpa'){
    console.log(pawnMoves(start,piece,board));
  }
  if (piece === 'wro' || piece === 'bro'){
    console.log(rookhMoves(start,piece,board));
  }

  // let startx,starty;
  // starty = start[0];
  // startx = start[1];
  // let possible_moves_list = possibleMoves(piece);
  // let valid_moves_list = validMoves(possible_moves_list,[startx,starty]);
  // console.log(valid_moves_list);
}


export { move };
