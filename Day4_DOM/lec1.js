
// selection example (by css selector)
const option1_css = document.querySelector("#option1")  
const boxList_css = document.querySelectorAll(".box") //Have to use ALL, otherwise only show 1st element
// console.log(boxList_css) // Here is an array but not real array

// //selection example (by js selector)
// const option1_js=document.getElementById("#option1");
// const boxList_js=document.getElementsByClassName(".box")

// console.log(option1_css) //type of option1 is an "Object" 
// console.log(option1_css.getAttribute("testing"))

// // console.log(option1_js)

// // //document.querySelectorAll manupuation

// // function updateGameContainer(input){
    
// // }

// //Event
// option1_css.addEventListener("click", () => {
//     console.log("clicked!!")
//     let newElement = document.createElement('div')
//     newElement.innerTest = 'hi' //set d 字係入面
//     const gameContainer = document.querySelector(".game-container")
//     gameContainer.appendChild(newElement)
// })

// window.addEventListener("scroll", () =>{
//     console.log("scrolling")
// })

// window.addEventListener("keydown", (event) => {
//     console.log("keydown: ", event.key)
// })
// //event -> capture the event which is the user input
// //press a then, output a

// // window.addEventListener("mousemove", (event) => 
// // {console.log("mouse location is: ", event.clientX, event.clientY)})

// //add event listener to individual box
// for (let box of boxList_css){
//     box.addEventListener('click', (event) => {
//         console.log(event.target.innerTest)
//     })
// }

//add event listener to main div
// const gameContainer = document.querySelector(".game-container")
// gameContainer.addEventListener('click', (event) => {
//     if (event.target.className ==="box"){
//            console.log(event.target.innerTest); 
//     }

// })

const record = document.querySelector(".record")
console.log(record.innerHTML)


//onclick example
const gameContainer = document.querySelector(".game-container");
gameContainer.onclick = function(event){
    if (event.target.className ==="box"){
            document.querySelector(".record").innerHTML = "Last Record : " +event.target.innerHTML
    }
}

document.querySelector("#add").addEventListener("click",() => {
    document.querySelector('#counter').innerHTML = parseInt(document.querySelector('#counter').innerText) +1
})