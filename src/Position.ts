export interface Position {
    x: number,
    y: number,
}

export function positionAdd(a: Position, b: Position): Position {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function positionEqual(a: Position, b: Position): boolean {
    return a.x === b.x && a.y === b.y;
}

export function positionPrint(a: Position): string {
    return `(${a.x},${a.y})`;
}