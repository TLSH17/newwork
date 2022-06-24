let turn = 1;
let squares = Array(9).fill(0);
let isEndGame = false;

// function getCurrentPlayerName() {
//     return turn % 2 === 0 ? "O" : "X";
// }
const getPlayerName = (idx) => ["O", "", "X"][idx + 1];
const getCurrentPlayerIndex = () => (turn % 2 === 0 ? 1 : -1);
const noticeBoard = document.querySelector(".notification-board");

function updateTurn(numOfTurn) {
    if (numOfTurn > 9) {
        alert("OMG");
    } else {
        turn = numOfTurn;
        noticeBoard.innerHTML = `${getPlayerName(getCurrentPlayerIndex())} Turn`;
    }
}

function updateSquaresUI() {
    for (let i = 0; i < 9; i++) {
        console.log(squares[i]);
        console.log(getPlayerName(squares[i]));
        document.querySelector(`#box-${i + 1}`).innerHTML = getPlayerName(squares[i]);
    }
}

function reset() {
    squares = Array(9).fill(0);
    updateSquaresUI();
    updateTurn(1);
    isEndGame = false;
}

function checkIsWin() {
    let leftToRight = 0;
    let rightToLeft = 0;
    for (let i = 0; i < 3; i++) {
        let row = 0;
        let col = 0;
        for (let j = 0; j < 3; j++) {
            row += squares[i * 3 + j];
            col += squares[j * 3 + i];
            if (i === j) {
                leftToRight += squares[i * 3 + j];
            }
            if (i + j === 2) {
                rightToLeft += squares[i * 3 + j];
            }
        }
        if (Math.abs(row) === 3 || Math.abs(col) === 3) {
            return true;
        }
    }
    if (Math.abs(leftToRight) === 3 || Math.abs(rightToLeft) === 3) {
        return true;
    }
    return false;
}

window.onload = () => {
    reset();

    document.querySelector(".control-board").addEventListener("click", (e) => {
        reset();
    });

    for (let i = 0; i < 9; i++) {
        document.querySelector(`#box-${i + 1}`).addEventListener("click", (e) => {
            if (e.currentTarget.innerText === "" && !isEndGame) {
                squares[i] = getCurrentPlayerIndex();
                console.log(squares);
                updateSquaresUI();
                isEndGame = checkIsWin();
                if (isEndGame) {
                    alert(`${getPlayerName(getCurrentPlayerIndex())} Win!!! `);
                } else {
                    updateTurn(turn + 1);
                }
            }
        });
    }
};