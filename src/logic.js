export function Ship(length){
    let hits = 0;
    let sunk = false;
  
    function hit() {
      hits++;
      if (hits === length) {
        sunk = true;
        return true
      }
    }
  
    function isSunk() {
      return sunk;
    }
  
    return {
      length,
      hit,
      isSunk
    };
}

export function Gameboard(){
    let board = Array(9).fill().map(() => Array(9).fill(0)); 
    function placeShip(x,y,len,alignment){
        x = parseInt(x)
        y = parseInt(y)
        len = parseInt(len)
        
        if (x>9 || y >9 || x<0 || y<0) return false

        if(alignment==='vertical'){
            if(x+len > 9) {
                // console.log("y+len is greated than 9")
                return false
            }
        } else if (alignment==='horizontal') {
            if(y+len > 9) {
                // console.log("x+len is greated than 9")
                return false
            }
        }

        if (board[x][y] != 0) return false
        if (alignment==='vertical'){
            for (let i = 0; i <= len-1; i++) {
                // if (board[x+i] == undefined) {
                //     // console.log("board[x+i] is undefined")
                //     return false
                // }
                // if (board[x+i][y] == undefined) {
                //     // console.log("board[x+i][y] is undefined")
                //     return false
                // }
                // if (board[x+i][y] != 0) {
                //     // console.log("board[x+i][y] is not 0")
                //     return false
                // }
                if (board[x+i] == undefined || board[x+i][y] == undefined || board[x+i][y] != 0) {
                    return false
                }
            }
        } else if (alignment==='horizontal') {
            for (let i = 0; i <= len-1; i++) {
                // if (board[x] == undefined) {
                //     // console.log("board[x+i] is undefined")
                //     return false
                // }
                // if (board[x][y+i] == undefined) {
                //     // console.log("board[x+i][y] is undefined")
                //     return false
                // }
                // if (board[x][y+i] != 0) {
                //     // console.log("board[x][y+i] is not 0")
                //     return false
                // }
                if (board[x] == undefined || board[x][y+i] == undefined || board[x][y+i] != 0) {
                    return false
                }
            }
        }

        board[x][y] = 'ship'
        if (len > 1) {
            if (alignment==='vertical'){
                for (let i = 0; i <= len-1; i++) {
                    board[x+i][y] = 'ship'
                }
            } else if (alignment==='horizontal') {
                for (let i = 0; i <= len-1; i++) {
                    board[x][y+i] = 'ship'
                }
            }
        }
        return true
    }

    function receiveAttack(x,y){
        if (board[x][y] === 'missed' || board[x][y] === 'hit')
            return
        if(board[x][y] === 'ship'){
            board[x][y] = 'hit'
            return 'hit'
        } else {
            board[x][y] = 'missed'
            return 'missed'
        }
    }

    function allShipSunk(){
        let allSunk = true
        for (let i = 0; i < 9; i++) {
            if (board[i].includes('ship')){
                allSunk = false
            }
        }
        return allSunk;
    }

    return {board, placeShip, receiveAttack, allShipSunk}
}