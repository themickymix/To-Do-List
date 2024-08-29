// Get DOM elements
const addTaskButton = document.getElementById("addTask");
const taskInput = document.getElementById("newTask");
const taskList = document.getElementById("taskList");

// Function to create a new task item
function createTaskItem(taskText, isCompleted = false, taskId) {
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex align-items-center task-item";
  listItem.id = taskId || `task${Date.now()}`; // Generate a unique ID if not provided

  // Create Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox m-2";
  checkbox.checked = isCompleted;
  checkbox.addEventListener("change", () => markComplete(listItem.id));
  listItem.appendChild(checkbox);

  // Create Task Text
  const textSpan = document.createElement("span");
  textSpan.textContent = taskText;
  if (isCompleted) {
    textSpan.classList.add("completed");
  }
  listItem.appendChild(textSpan);

  // Create Delete Button
  const buttonGroup = document.createElement("div");
  buttonGroup.className = "btn-group btn-group-sm ml-auto";

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => removeTask(listItem.id));
  buttonGroup.appendChild(deleteButton);

  listItem.appendChild(buttonGroup);

  return listItem;
}

// Function to mark a task as complete
function markComplete(taskId) {
  const taskItem = document.getElementById(taskId);
  if (taskItem) {
    const textSpan = taskItem.querySelector("span");
    const checkbox = taskItem.querySelector("input[type='checkbox']");
    if (checkbox.checked) {
      textSpan.classList.add("completed");
    } else {
      textSpan.classList.remove("completed");
    }
    saveTasks(); // Save tasks after marking complete
  }
}

// Function to remove a task
function removeTask(taskId) {
  console.log(`Attempting to remove task with ID: ${taskId}`); // Debugging line
  const taskItem = document.getElementById(taskId);
  if (taskItem) {
    taskList.removeChild(taskItem);
    saveTasks(); // Save tasks after removing
  } else {
    console.log(`No task found with ID: ${taskId}`); // Debugging line
  }
}

// Function to save tasks to Local Storage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll("li").forEach((li) => {
    const taskText = li.querySelector("span").textContent;
    const isCompleted = li
      .querySelector("span")
      .classList.contains("completed");
    const checkboxChecked = li.querySelector("input[type='checkbox']").checked;
    tasks.push({ text: taskText, completed: checkboxChecked, id: li.id });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from Local Storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const newTaskItem = createTaskItem(task.text, task.completed, task.id);
    taskList.appendChild(newTaskItem);
  });
}

// Event listener for the Add Task button
addTaskButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const newTaskItem = createTaskItem(taskText);
    taskList.appendChild(newTaskItem);
    taskInput.value = ""; // Clear the input field
    saveTasks(); // Save tasks after adding
  }
});

// Optional: Allow pressing Enter to add a task
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskButton.click();
  }
});

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);
lor