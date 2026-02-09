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

function isPossibleMove(board: Board, piece: Piece, position: {x: number, y: number}) : boolean {
    switch(piece.type){
        case "pawn":
            const maxSquares = piece.hasMoved ? 1 : 2
            const canMove = piece.position.x - position.x <= maxSquares && piece.position.y == position.y && !board.squares[position.x][position.y]
            // pode ir pra frente (se nao tiver peca), 1 mvt = 2 casas, em diante 1 casa
            if(canMove){
                return true
            }
            // pode capturar outra peca na diagonal
            const hasEnemyPiece = board.squares[position.x][position.y] && board.squares[position.x][position.y]?.color != piece.color
            const canCapture = piece.position.x - position.x == 1 && Math.abs(piece.position.y - position.y) == 1 && hasEnemyPiece
            if(canCapture){
                return true
            }
            return false
        default:
            return false
    }
}

