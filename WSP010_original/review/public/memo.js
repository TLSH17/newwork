export async function loadMemos() {
  const resp = await fetch("/memos");
  const memos = await resp.json();
  let htmlStr = "";
  for (const memo of memos) {
    const image = memo.image ? `<img src="/image/${memo.image}" alt="memo-image" width="100">` : "";
    htmlStr += /*html*/ `
    <div class="memo">
      <div contenteditable="true" id="memo-content-${memo.id}">${memo.content}</div>
      ${image}
      <div class="button-div">
        <i class="bi bi-trash" onClick="deleteMemo(${memo.id})"></i>
        <i class="bi bi-pen" onClick="editMemo(${memo.id})"></i>
      </div>
    </div>
    `;
  }
  document.querySelector("#memo-board").innerHTML = htmlStr;
}
