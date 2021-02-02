



// function possibleMoves(piece){
//   let possible_moves_list = [];
//   if (piece === 'wki' || piece === 'bki'){
//     for (let i=-1; i<=1; i++){
//       for (let j=-1; j<=1; j++){
//         if (i===0 && j===0){
//           continue;
//         }
//         possible_moves_list.push([i,j]);
//       }
//     }
//     return (possible_moves_list);
//   }
//   if (piece === 'wro' || piece === 'bro'){
//     for (let i=-7; i<=7; i++){
//       if (i===0){
//         continue;
//       }
//       possible_moves_list.push([i,0],[0,i]);
//     }
//     return (possible_moves_list);
//   }
//   if (piece === 'wbi' || piece === 'bbi'){
//     for (let i=-7; i<=7; i++){
//       if (i===0){
//         continue;
//       }
//       possible_moves_list.push([i,-i],[i,i]);
//     }
//     return (possible_moves_list);
//   }
// }

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
  let startx,starty;
  starty = start[0];
  startx = start[1];
  let possible_moves_list = possibleMoves(piece);
  let valid_moves_list = validMoves(possible_moves_list,[startx,starty]);
  console.log(valid_moves_list);
}


export { move };
