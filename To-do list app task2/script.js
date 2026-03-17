const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Date Display
document.getElementById('date-display').innerText = new Date().toDateString();

// Load tasks from LocalStorage
document.addEventListener('DOMContentLoaded', getTasks);

// Add Task function
addBtn.addEventListener('click', () => {
    if (taskInput.value === "") return;
    createTaskElement(taskInput.value);
    saveLocalTasks(taskInput.value);
    taskInput.value = "";
});

function createTaskElement(text) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span onclick="this.classList.toggle('completed')">${text}</span>
        <i class="fas fa-trash delete-btn" onclick="removeTask(this, '${text}')"></i>
    `;
    taskList.appendChild(li);
}

// Local Storage functions
function saveLocalTasks(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => createTaskElement(task));
}

function removeTask(element, taskText) {
    element.parentElement.remove();
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const index = tasks.indexOf(taskText);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}