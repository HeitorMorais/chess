import type { Board, Piece } from "./entities/types.ts"

export function moveTo(board: Board, piece: Piece, newPosition: {x: number, y: number}){
    const isValid = true // later I will create a function to validate positions
    if(isValid){
        const row = piece.position.x
        const column = piece.position.y
        board.squares[row][column] = null
        
        board.squares[newPosition.x][newPosition.y] = piece 
        piece.position.x = newPosition.x
        board.squares[newPosition.x][newPosition.y] = piece
        piece.position.y = newPosition.y
    }
}