const postsDiv = document.getElementById("posts");
const postForm = document.getElementById("postForm");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");

const API_URL = "/api/posts";


function renderPost(post) {
  const div = document.createElement("div");
  div.className = "post";
  div.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.body}</p>
  `;
  postsDiv.appendChild(div);
}


async function fetchPosts() {
  const res = await fetch(API_URL);
  const posts = await res.json();

  postsDiv.innerHTML = "";
  posts.slice(0, 10).forEach(renderPost);
}


postForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newPost = {
    title: titleInput.value,
    body: bodyInput.value,
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost)
  });

  const createdPost = await res.json(); 

  renderPost(createdPost); 

  titleInput.value = "";
  bodyInput.value = "";
});

fetchPosts();
