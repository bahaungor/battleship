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
        if (x>9 || y >9 || x<0 || y<0) return false

        const ship = Ship(len)

        if(alignment==='vertical'){
            if(y+ship.length > 9) return false
        } else if (alignment==='horizontal') {
            if(x+ship.length > 9) return false
        }

        board[x][y] = 'ship'
        if (alignment==='vertical'){
            for (let i = 1; i <= ship.length; i++) {
                board[x+i][y] = 'ship'
            }
        } else if (alignment==='horizontal') {
            for (let i = 0; i < ship.length; i++) {
                board[x][y+i] = 'ship'
            }
        }
        return true
    }

    function receiveAttack(x,y){
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

export function Player(){
    board = Gameboard()

    return {board}
}