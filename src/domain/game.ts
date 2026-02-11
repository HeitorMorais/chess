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
        // vou ter que fazer a verificao raiox se a peça sair for um eventual checkmate
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
        case "bishop":
            //pode ir na diagonal se nao houver pecas
            if(isMoveDiagonal(piece, position.x, position.y) && !board.squares[position.x][position.y]){
                return true
            }
            return false
        default:
            return false
    }
}

function isMoveDiagonal(piece: Piece, x: number, y: number){
    return checkDiagonalUpRight(piece, x, y) || checkDiagonalDownRight(piece, x, y) || checkDiagonalUpLeft(piece, x, y) || checkDiagonalDownLeft(piece, x, y)
}

function checkDiagonalUpRight(piece: Piece, x: number, y: number){
    while(x >= 0 && y <= 7){
        if(piece.position.x == x && piece.position.y == y){
        return true
        }
        x--
        y++
    }
    return false
}

function checkDiagonalDownRight(piece: Piece, x: number, y: number){
    while(x <= 7 && y >= 0){
        if(piece.position.x == x && piece.position.y == y){
            return true
        }
        x++
        y--
    }
    return false
}

function checkDiagonalUpLeft(piece: Piece, x: number, y: number){
    while(x >= 0 && y >=0){
        if(piece.position.x == x && piece.position.y == y){
            return true
        }
        x--;
        y--;
    }
}

function checkDiagonalDownLeft(piece: Piece, x: number, y: number){
    while(x <= 7 && y >= 0){
        if(piece.position.x == x && piece.position.y == y){
            return true
        }
        x++
        y--
    }
}

