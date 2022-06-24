

console.log("I am frontend");

document
  .querySelector('#memoform')
  .addEventListener('submit', async function (event) {
    event.preventDefault()

    // Serialize the Form afterwards
    const form = event.target
    const formObject = {}
    formObject['content'] = form.content.value
    formObject['image'] = form.image.value

    console.log(form.content.value)

    const userResult = await fetch('/memos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject),
    })


    const result = await userResult.json()
    console.log(result)
    document.querySelector('#user-result').innerHTML = result
  })

//loadmemos
  async function loadMemos(){
    const res = await fetch('/memos') ; // Fetch from the correct url
    const memos = await res.json();
    const memosContainer = document.querySelector('#memo-board');
    console.log("here is memos!!!:"+ memosContainer)

    for(let memo of memos){
        console.log("Hi")
        memosContainer.innerHTML += ` <div class="memo">
           ${memo.content}
         </div>
         `
        
    }
    
}

  loadMemos()

//   //Update and delete

//     const memoDivs = [...document.querySelectorAll('.memo')];
//     for(let index in memoDivs){
//         const memoDiv = memoDivs[index]
//         memoDiv.querySelector('selector-of-edit-button').addEventListener('click', async (event)=>{
//             // Do your fetch  logic here
//         });

//     }
