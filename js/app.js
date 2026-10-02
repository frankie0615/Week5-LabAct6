// ==========================================
// SECURE DYNAMIC TASK MANAGER
// ==========================================


// DOM ELEMENTS

const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const loadSamplesBtn = document.querySelector("#loadSamplesBtn");

const taskList = document.querySelector("#taskList");
const taskMessage = document.querySelector("#taskMessage");

const totalCount = document.querySelector("#totalCount");
const pendingCount = document.querySelector("#pendingCount");
const completedCount = document.querySelector("#completedCount");


// TASK ID COUNTER

let taskCounter = 0;


// ==========================================
// CREATE TASK ELEMENT
// ==========================================

function createTaskElement(taskText, taskId) {

    const taskItem = document.createElement("li");

    taskItem.classList.add("task-item");

    taskItem.dataset.taskId = taskId;

    taskItem.dataset.state = "pending";


    // TASK TEXT

    const textSpan = document.createElement("span");

    textSpan.classList.add("task-text");

    textSpan.textContent = taskText;


    // COMPLETE BUTTON

    const completeBtn = document.createElement("button");

    completeBtn.classList.add("complete-btn");

    completeBtn.textContent = "Complete";


    // EDIT BUTTON

    const editBtn = document.createElement("button");

    editBtn.classList.add("edit-btn");

    editBtn.textContent = "Edit";


    // REMOVE BUTTON

    const removeBtn = document.createElement("button");

    removeBtn.classList.add("remove-btn");

    removeBtn.textContent = "Remove";


    // ADD CHILDREN

    taskItem.appendChild(textSpan);

    taskItem.appendChild(completeBtn);

    taskItem.appendChild(editBtn);

    taskItem.appendChild(removeBtn);


    return taskItem;
}


// ==========================================
// ADD TASK
// ==========================================

function addTask(taskText) {

    const cleanText = taskText.trim();


    if (cleanText === "") {

        taskMessage.textContent =
            "Task cannot be empty";

        return;
    }


    taskCounter++;

    const taskId = "task-" + taskCounter;


    const taskItem =
        createTaskElement(
            cleanText,
            taskId
        );


    taskList.appendChild(taskItem);


    taskInput.value = "";

    taskMessage.textContent = "";


    updateTaskCounts();
}


// ==========================================
// TOGGLE COMPLETE
// ==========================================

function toggleTaskComplete(taskItem) {

    taskItem.classList.toggle("completed");


    if (
        taskItem.classList.contains("completed")
    ) {

        taskItem.dataset.state = "completed";

    } else {

        taskItem.dataset.state = "pending";
    }


    updateTaskCounts();
}


// ==========================================
// BEGIN EDIT
// ==========================================

function beginTaskEdit(taskItem) {

    const textSpan =
        taskItem.querySelector(".task-text");

    const editButton =
        taskItem.querySelector(".edit-btn");


    const editInput =
        document.createElement("input");


    editInput.type = "text";

    editInput.classList.add("edit-input");

    editInput.value = textSpan.textContent;


    textSpan.replaceWith(editInput);

    editButton.textContent = "Save";

    editInput.focus();
}


// ==========================================
// SAVE EDIT
// ==========================================

function saveTaskEdit(taskItem) {

    const editInput =
        taskItem.querySelector(".edit-input");


    if (!editInput) {
        return;
    }


    const newText =
        editInput.value.trim();


    if (newText === "") {

        taskMessage.textContent =
            "Task cannot be empty";

        return;
    }


    const newTextSpan =
        document.createElement("span");


    newTextSpan.classList.add("task-text");

    newTextSpan.textContent = newText;


    editInput.replaceWith(newTextSpan);


    const editButton =
        taskItem.querySelector(".edit-btn");

    editButton.textContent = "Edit";


    taskMessage.textContent = "";
}


// ==========================================
// REMOVE TASK
// ==========================================

function removeTask(taskItem) {

    taskItem.remove();

    updateTaskCounts();
}


// ==========================================
// UPDATE COUNTS
// ==========================================

function updateTaskCounts() {

    const tasks =
        taskList.querySelectorAll(".task-item");


    let total = 0;
    let pending = 0;
    let completed = 0;


    tasks.forEach(function(task) {

        total++;


        if (
            task.dataset.state === "completed"
        ) {

            completed++;

        } else {

            pending++;
        }

    });


    totalCount.textContent = total;

    pendingCount.textContent = pending;

    completedCount.textContent = completed;
}


// ==========================================
// EVENT DELEGATION
// ==========================================

function handleTaskListClick(event) {

    const taskItem =
        event.target.closest(".task-item");


    if (!taskItem) {
        return;
    }


    // COMPLETE

    if (
        event.target.matches(".complete-btn")
    ) {

        toggleTaskComplete(taskItem);

        return;
    }


    // EDIT / SAVE

    if (
        event.target.matches(".edit-btn")
    ) {

        const editInput =
            taskItem.querySelector(".edit-input");


        if (editInput) {

            saveTaskEdit(taskItem);

        } else {

            beginTaskEdit(taskItem);
        }

        return;
    }


    // REMOVE

    if (
        event.target.matches(".remove-btn")
    ) {

        removeTask(taskItem);

        return;
    }
}


// ==========================================
// LOAD SAMPLE TASKS
// ==========================================

function loadSampleTasks() {

    const fragment =
        document.createDocumentFragment();


    const sampleTasks = [
        "Review DOM selectors",
        "Practice createElement",
        "Study event delegation"
    ];


    sampleTasks.forEach(function(taskText) {

        taskCounter++;

        const taskId =
            "task-" + taskCounter;


        const taskItem =
            createTaskElement(
                taskText,
                taskId
            );


        fragment.appendChild(taskItem);

    });


    // APPEND ONLY ONCE

    taskList.appendChild(fragment);


    updateTaskCounts();
}


// ==========================================
// BUTTON EVENTS
// ==========================================

addTaskBtn.addEventListener(
    "click",
    function() {

        addTask(taskInput.value);

    }
);


loadSamplesBtn.addEventListener(
    "click",
    function() {

        loadSampleTasks();

    }
);


// ==========================================
// ONE TASK LISTENER
// ==========================================

taskList.addEventListener(
    "click",
    handleTaskListClick
);


// ==========================================
// INITIAL COUNTS
// ==========================================

updateTaskCounts();
