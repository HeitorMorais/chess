import type { Board, Piece } from "./entities/types.ts"
import { moveTo } from "./game.ts" 

export function initializeBoard(){
    const board : Board = {
        squares: Array.from({length: 8}, () => Array(8).fill(null))
    }
    populateBoard(board, "white")
    populateBoard(board, "black")
    //testes
    let seeBoard : string | undefined = ""
    for(let i=0; i<8; i++){
        for(let j=0; j<8; j++){
            seeBoard += ` ${board.squares[i][j]?.type}`
        }
        seeBoard += '\n'
    }
    console.log(seeBoard)
    
}
initializeBoard()
function populateBoard(board: Board, color: "white" | "black"){
    // populate paws
    const row : number = color == "white" ? 7 : 0
    const pawnRows : number = color == "white" ? 6 : 1
    
    for(let i = 0; i < 8; i++){
        const pawn : Piece = {
        type: "pawn",
        color: color,
        hasMoved: false,
        position: {x: pawnRows, y: i}
        }
        board.squares[pawnRows][i] = pawn    
    }

    // populate rooks
    for(let i = 0; i < 8; i+=7){
        const rook : Piece = {
            type: "rook",
            color: color,
            hasMoved: false,
            position: {x: row, y: i}
        }
        board.squares[row][i] = rook
    }

    //populate knights
    for(let i = 1; i < 7; i+=5){
        const knight : Piece = {
            type: "knight",
            color: color,
            hasMoved: false,
            position: {x: row, y: i}
        }
        board.squares[row][i] = knight
    }

    //populate bishops
    for(let i = 2; i < 6; i+=3){
        const bishop: Piece = {
            type: "bishop",
            color: color,
            hasMoved: false,
            position: {x: row, y: i}
        }
        board.squares[row][i] = bishop
    }

    //populate queens
    const queen : Piece = {
        type: "queen",
        color: color,
        hasMoved: false,
        position: {x: row, y: 3}
    }
    board.squares[row][3] = queen

    //populate kings
    const king : Piece = {
        type: "king",
        color: color,
        hasMoved: false,
        position: {x: row, y: 4}
    }
    board.squares[row][4] = king
}

