// app.js
import { TodoList } from "./todo.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const myTodos = new TodoList();

function menu() {
  console.log("\n=== TODO MENU ===");
  console.log("1. Add Task");
  console.log("2. Mark Task Complete");
  console.log("3. List Tasks");
  console.log("4. Exit");
  rl.question("Choose an option: ", handleOption);
}

function handleOption(option) {
  switch(option.trim()) {
    case "1":
      rl.question("Enter task: ", task => {
        myTodos.addTask(task.trim());
        console.log("✅ Task added!");
        menu();
      });
      break;
    case "2":
      rl.question("Enter task to mark complete: ", task => {
        myTodos.markComplete(task.trim());
        menu();
      });
      break;
    case "3":
      myTodos.listTasks();
      menu();
      break;
    case "4":
      console.log("👋 Goodbye!");
      rl.close();
      break;
    default:
      console.log("⚠️ Invalid option!");
      menu();
  }
}


menu();
