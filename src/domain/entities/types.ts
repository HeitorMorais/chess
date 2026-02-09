export interface Piece {
  type: "pawn" | "rook" | "knight" | "bishop" | "queen" | "king"
  color: "white" | "black"
  position: { x: number; y: number }
}

export interface Board {
  squares: (Piece | null)[][]
}
