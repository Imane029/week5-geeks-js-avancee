const todoList = document.getElementById("todoList");
const todoForm = document.getElementById("todoForm");
const titleInput = document.getElementById("title");

const API_URL = "/api/todos";


async function fetchTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();

  todoList.innerHTML = "";
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="${todo.completed ? "completed" : ""}">${todo.title}</span>
      <div>
        <button onclick="toggleTodo('${todo.id}', ${todo.completed})">
          ${todo.completed ? "Annuler" : "Terminer"}
        </button>
        <button onclick="deleteTodo('${todo.id}')">Supprimer</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}


todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newTodo = { title: titleInput.value };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo)
  });

  titleInput.value = "";
  fetchTodos();
});


async function toggleTodo(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed })
  });
  fetchTodos();
}


async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTodos();
}


fetchTodos();
