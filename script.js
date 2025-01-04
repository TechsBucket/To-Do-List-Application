document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  // Add Task
  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = `
        <span>${taskText}</span>
        <button class="deleteBtn">Delete</button>
      `;

      taskItem.querySelector("span").addEventListener("click", () => {
        taskItem.querySelector("span").classList.toggle("completed");
      });

      taskItem.querySelector(".deleteBtn").addEventListener("click", () => {
        taskList.removeChild(taskItem);
        saveTasks();
      });

      taskList.appendChild(taskItem);
      taskInput.value = "";
      saveTasks();
    }
  });

  // Save tasks to localStorage
  const saveTasks = () => {
    const tasks = [];
    taskList.querySelectorAll("li").forEach(task => {
      tasks.push({
        text: task.querySelector("span").innerText,
        completed: task.querySelector("span").classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Load tasks from localStorage
  const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    savedTasks.forEach(task => {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        <button class="deleteBtn">Delete</button>
      `;
      taskItem.querySelector("span").addEventListener("click", () => {
        taskItem.querySelector("span").classList.toggle("completed");
        saveTasks();
      });
      taskItem.querySelector(".deleteBtn").addEventListener("click", () => {
        taskList.removeChild(taskItem);
        saveTasks();
      });
      taskList.appendChild(taskItem);
    });
  };

  loadTasks();
});