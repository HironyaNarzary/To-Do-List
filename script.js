// Selectors
const taskInput = document.querySelector(".TaskAddingBar");
const taskButton = document.querySelector(".todo-button");
const taskList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTasks); // Load tasks from localStorage on DOM load
taskButton.addEventListener("click", addTask);
taskList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTasks);

// Functions

function addTask(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Check if task input is empty
  if (taskInput.value.trim() === "") {
    alert("Please enter a task.");
    return; // Exit the function if the input is empty
  }

  // Task Div
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("todo");

  // Create li
  const newTask = document.createElement("li");
  newTask.innerText = taskInput.value;
  newTask.classList.add("todo-item");
  taskDiv.appendChild(newTask);

  // Add task to localStorage
  saveLocalTasks(taskInput.value);

  // Check mark button
  const completedButton = document.createElement("button");
  completedButton.innerText = "Complete";
  completedButton.classList.add("complete-btn");
  taskDiv.appendChild(completedButton);

  // Trash button
  const trashButton = document.createElement("button");
  trashButton.innerText = "Delete";
  trashButton.classList.add("trash-btn");
  taskDiv.appendChild(trashButton);

  // Append to list
  taskList.appendChild(taskDiv);

  // Clear task input value
  taskInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  // Delete task
  if (item.classList[0] === "trash-btn") {
    const task = item.parentElement;
    removeLocalTasks(task);
    task.remove();
  }

  // Mark as complete
  if (item.classList[0] === "complete-btn") {
    const task = item.parentElement;
    task.classList.toggle("completed");
  }
}

function filterTasks(e) {
  const tasks = taskList.childNodes;
  tasks.forEach(function (task) {
    switch (e.target.value) {
      case "all":
        task.style.display = "flex";
        break;
      case "completed":
        if (task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
      case "incomplete":
        if (!task.classList.contains("completed")) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
        break;
    }
  });
}

// Save tasks to localStorage
function saveLocalTasks(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get tasks from localStorage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    // Task Div
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("todo");

    // Create li
    const newTask = document.createElement("li");
    newTask.innerText = task;
    newTask.classList.add("todo-item");
    taskDiv.appendChild(newTask);

    // Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerText = "Complete";
    completedButton.classList.add("complete-btn");
    taskDiv.appendChild(completedButton);

    // Trash button
    const trashButton = document.createElement("button");
    trashButton.innerText = "Delete";
    trashButton.classList.add("trash-btn");
    taskDiv.appendChild(trashButton);

    // Append to list
    taskList.appendChild(taskDiv);
  });
}

// Remove tasks from localStorage
function removeLocalTasks(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  const taskIndex = task.children[0].innerText;
  tasks.splice(tasks.indexOf(taskIndex), 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
