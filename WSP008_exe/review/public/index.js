window.onload = () => {
  loadMemos();
  initPostMemoForm();
};


async function loadMemos() {
  const resp = await fetch("/memos"); //default get
  const memos = await resp.json(); //resp.json 會出promise // 等如ts 的memos
  let htmlStr = ""; //不斷update 所以要用let
  let deleteCounter = 0;
  let editCounter = 0;

  for (const memo of memos) {
    deleteCounter += 1;
    editCounter += 1;

    const image = memo.image ? `<img src="/image/${memo.image}" alt="memo-image" width="100">` : "";
    htmlStr += /*html*/ `
    <div class="memo">
      ${memo.content}
      ${image}
      <div class="button-div">
        <i class="bi bi-trash" id="deletememo${deleteCounter}"></i>
        <i class="bi bi-pen" id="editmemo${editCounter}" ></i>
      </div>
    </div>
    `;
    // document.querySelector(".bi-trash").addEventListener('click',function(e){
    //   console.log('hiiii')
    // })
  }
  document.querySelector("#memo-board").innerHTML = htmlStr;

  const memoDivs = [document.querySelectorAll('.memo')];


}

function initPostMemoForm() {
  document.querySelector("#form-post-memo").addEventListener("submit", async (e) => {
    //quertSelector = form id#
    e.preventDefault();     //make sure will not change the page
    const form = e.target;  //get back the form 
    const formData = new FormData();
    formData.append("content", form.content.value); 
    //"content" 要去番server file(.ts) 點set，影響去server 拎野
    //form.content.value = data from input memo 
    formData.append("image", form.image.files[0]);  
     //"image" 要去番server file(.ts) 點set，影響去server 拎野
    //form.image.files = data from input file, [0]-> 1st file item
    const resp = await fetch("/memos", {  
      // 幫我地建立request比server + 等server 回應_ is promise! (去左server.ts app.post memos,triggle完再黎)
      // 放番個path pattern("/memos"), 額外config 放｛｝
      method: "POST", //default body is get, so need to change post 
      body: formData,  
    });
    const result = await resp.json(); //拆解番個json, 把內容轉object/ 會return promise, so need await
    if (result.success) {
      alert("Success !!!");
      form.reset();
      loadMemos();
    } else {
      alert(result.message);
    }
  });
}
