function knightMoves(start, end) {
    const boardSize = 8;

    const isOnBoard = ([x, y]) => 
        x >= 0 && x < boardSize && y >= 0 && y < boardSize;

    const moveOffsets = [
        [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]
    ];

    const getPossibleMoves = ([x, y]) =>
        moveOffsets.map(([dx, dy]) => [x + dx, y + dy])
        .filter(isOnBoard);
    
    if (!isOnBoard(start) || !isOnBoard(end)) {
        throw new Error('Coordinates must be within the board 0-7');
    }

    const key = ([x, y]) => `${x}, ${y}`;
    const visited = new Set([key(start)]);
    const queue = [[start]];

    while (queue.length > 0) {
        const path = queue.shift();
        const current = path[path.length - 1];

        if (current[0] === end[0] && current[1] === end[1]) {
            return path;
        }

        for (const move of getPossibleMoves(current)) {
            const moveKey = key(move);

            if (!visited.has(moveKey)) {
                visited.add(moveKey);
                queue.push([...path, move]);
            }
        }
    }

    return null;
}

export function printKnightMoves(start, end) {
    const path = knightMoves(start, end);

    console.log(`You made it in ${path.length - 1} moves! Here is your path:`);
    path.forEach((position) => console.log('    ', position));
    return path;
}