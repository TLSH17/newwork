const boxes = document.querySelectorAll('.box')

// const boxesContent = boxes.innerText
// console.log(boxesContent)
const noticeBoard = document.querySelector(".notification-board");
const getCurrentPlayerName = document.querySelector(".notification-board")


const b1 = document.querySelector('#box1').innerText
console.log(b1)
const b2 = document.querySelector('#box2').innerText
const b3 = document.querySelector('#box3').innerText
const b4 = document.querySelector('#box4').innerText
const b5 = document.querySelector('#box5').innerText
const b6 = document.querySelector('#box6').innerText
const b7 = document.querySelector('#box7').innerText
const b8 = document.querySelector('#box8').innerText
const b9 = document.querySelector('#box9').innerText

if (b1 == "X" && b2 == "X" && b3 == "X" || b1 == "O" && b2 == "O" && b3 == "O") {
    console.log("Win")
} else if (b4 == "X" && b5 == "X" && b6 == "X" || b4 == "O" && b5 == "O" && b6 == "O") {
    console.log("Win")
} else if (b7 == "X" && b8 == "X" && b9 == "X" || b7 == "O" && b8 == "O" && b9 == "O") {
    console.log("Win")
} else if (b1 == "X" && b4 == "X" && b7 == "X" || b1 == "O" && b4 == "O" && b7 == "O") {
    console.log("Win")
} else if (b2 == "X" && b5 == "X" && b8 == "X" || b2 == "O" && b5 == "O" && b8 == "O") {
    console.log("Win")
} else if (b3 == "X" && b6 == "X" && b9 == "X" || b3 == "O" && b6 == "O" && b9 == "O") {
    console.log("Win")
} else if (b1 == "X" && b5 == "X" && b9 == "X" || b1 == "O" && b5 == "O" && b9 == "O") {
    console.log("Win")
} else if (b3 == "X" && b5 == "X" && b7 == "X" || b3 == "O" && b5 == "O" && b7 == "O") {
    console.log("Win")
}



let turn = 1;


for (let box of boxes) {
    box.addEventListener('click', function (event) {
        const boxText = event.target.innerText;
        console.log(boxText);
        if (boxText === "" && (turn % 2 === 0)) {
            event.target.innerText = "X";
            turn += 1;
        } else if (boxText === "" && (turn % 2 !== 0)) {
            event.target.innerText = "O";
            turn += 1;
            noticeBoard.innerHTML = `${getCurrentPlayerName} Turn`
        }
        console.log("Turn : " + turn)
    });
}



[1, 2, 3, 4, 5, 6, 7, 8, 9]

1, 2, 3
4, 5, 6
7, 8, 9
1, 4, 7
2, 5, 8
3, 6, 9
1, 5, 9
3, 5, 7



