
type Player = 'X' | 'O'

type Position = [x: number, y: number]

enum Direction {
    UP,
    Down,
    Left,
    Right,
}

enum PositionIndex {
    X = 0,
    Y = 1
}

function createPlayer(player: Player) {
    let position: Position = [0, 0]

    function move(direction: Direction) {
        switch (direction) {
            case Direction.UP:
                position[PositionIndex.Y]++
                break
            case Direction.Down:
                position[PositionIndex.Y]--
                break
            case Direction.Left:
                position[PositionIndex.X]--
                break
            case Direction.Right:
                position[PositionIndex.Y]++
                break
        }
    }

    function getPosition() {
        return position
    }

    return {
        move,
        getPosition
    }
}

let player_1 = createPlayer('X')

console.log('what is your init position', player_1.getPosition())

console.log('move up')

