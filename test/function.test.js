import { Ship, Gameboard } from "../src/logic";
const ship = Ship(1)
test('ship must not be sunk', () => {
    expect(ship.isSunk()).toBe(false);
});
test('ship length must obey', () => {
    expect(ship.length).toBe(1);
});
test('ship can be hit', () => {
    expect(ship.hit()).toBe(true);
});
test('After hit, ship must sunk', () => {
    expect(ship.isSunk()).toBe(true);
});


test('Cannot place ship outside the board', () => {
    const board = Gameboard()
    expect(board.placeShip(9,7,3,"vertical")).toBe(false);
});
test('Cannot place ship outside the board', () => {
    const board = Gameboard()
    expect(board.placeShip(7,9,3,"horizontal")).toBe(false);
});
test('Ship is placed correctly', () => {
    const board = Gameboard()
    board.placeShip(5,5,3,"horizontal")
    expect(board.board[5][5]).toBe('ship');
});
test('Ship is placed correctly', () => {
    const board = Gameboard()
    board.placeShip(5,5,3,"horizontal")
    expect(board.board[5][7]).toBe('ship');
});
test('Ship is placed correctly', () => {
    const board = Gameboard()
    board.placeShip(5,5,3,"horizontal")
    expect(board.board[5][8]).toBe(0);
});


test('Receive attack function properly', () => {
    const board = Gameboard()
    board.placeShip(5,5,3,"horizontal")
    expect(board.receiveAttack(5,5)).toBe('hit');
});
test('Receive attack function properly', () => {
    const board = Gameboard()
    board.placeShip(5,5,3,"horizontal")
    expect(board.receiveAttack(5,8)).toBe('missed');
});


test('Repport ship status', () => {
    const board = Gameboard()
    board.placeShip(5,5,3,"horizontal")
    expect(board.allShipSunk()).toBe(false);
});
test('Repport ship status', () => {
    const board = Gameboard()
    board.placeShip(5,5,1,"horizontal")
    board.receiveAttack(5,5)
    expect(board.allShipSunk()).toBe(true);
});
test('Repport ship status', () => {
    const board = Gameboard()
    board.placeShip(5,5,2,"horizontal")
    board.receiveAttack(5,5)
    board.receiveAttack(5,6)
    expect(board.allShipSunk()).toBe(true);
});