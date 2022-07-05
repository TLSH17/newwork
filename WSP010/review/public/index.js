// let hello;
import { loadMemos } from "./memo.js";

window.onload = () => {
  // hello123 = 123;
  loadMemos();
  initPostMemoForm();
  initLoginForm();
};

function initPostMemoForm() {
  document.querySelector("#form-post-memo").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();
    formData.append("content", form.content.value);
    formData.append("image", form.image.files[0]);
    const resp = await fetch("/memos", {
      method: "POST",
      body: formData,
    });
    const result = await resp.json();
    if (result.success) {
      alert("Success !!!");
      form.reset();
      loadMemos();
    } else {
      alert(result.message);
    }
  });
}

function initLoginForm() {
  document.querySelector("#form-login").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;
    const resp = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await resp.json();
    if (!result.success) {
      // error handling
    } else {
      window.location.href = "/admin.html";
    }
  });
}

async function editMemo(id) {
  const content = document.querySelector(`#memo-content-${id}`).innerText;
  const resp = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  const result = await resp.json();
  if (result.success) {
    loadMemos();
  }
}

async function deleteMemo(id) {
  const resp = await fetch(`/memos/${id}`, { method: "DELETE" });
  const result = await resp.json();
  if (result.success) {
    loadMemos();
  }
}
