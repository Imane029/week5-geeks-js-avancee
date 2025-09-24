// todo.js
export class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push({ task, complete: false });
  }

  markComplete(task) {
    const found = this.tasks.find(t => t.task === task);
    if (found) found.complete = true;
    else console.log("⚠️ Task not found!");
  }

  listTasks() {
    if (this.tasks.length === 0) {
      console.log("📭 No tasks found.");
    } else {
      console.log("📝 Todo List:");
      this.tasks.forEach((t, i) => {
        console.log(`${i + 1}. [${t.complete ? "✔" : " "}] ${t.task}`);
      });
    }
  }
}
