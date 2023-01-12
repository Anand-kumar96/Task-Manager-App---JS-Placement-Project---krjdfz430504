const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const box3 = document.querySelector(".box3");
const box4 = document.querySelector(".box4");
const addTask = document.querySelector(".add_Task");
const addText = document.querySelector(".add_name");
const text_front = document.querySelector(".text_front");
var text_description = document.querySelector(".text_description");
const btn_Save = document.querySelector(".btn_Save");
const btn_Cancel = document.querySelector(".btn_Cancel");
const btn_Done = document.querySelectorAll(".btn_done");

var localStorageKey = "taskmanager";
var dragTarget;
var taskStorage = [];

// initialize the Task 
function initializeTask() {
    var state = localStorage.getItem(localStorageKey)
    if (!state) {
        return []
    }
    return JSON.parse(state)
}

// saveState function
function saveState() {
    var state = JSON.stringify(taskStorage)
    localStorage.setItem(localStorageKey, state);
}

// creating task Object 
function createTaskObject(uId, taskName, stat, des) {
    return {
        id: uId,
        name: taskName,
        status: stat,
        description: des,
    }
}

// adding new task
addTask.addEventListener("submit", (e) => {
    e.preventDefault();
    if (addText.value == "") {
        alert("input can't be empty");
        return;
    } else {
        document.querySelector(".modal-content").style.visibility = "visible";
        document.querySelector(".modal-content").style.zIndex = "1";
        text_front.innerText = addText.value;
    }
});

// eventListener to add the task
btn_Save.addEventListener("click", (el) => {
    el.preventDefault();
    if (text_description.value == "") {
        alert("please enter the description");
        return;
    }
    document.querySelector(".modal-content").style.visibility = "hidden";
    newTaskAdded();
});

// eventListener to Cancel the task
btn_Cancel.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".modal-content").style.visibility = "hidden";
    addText.value = "";
    text_description.value = "";
    return;
});

// creating each time new task
function newTaskAdded() {
    var newId = 'u' + Math.random() * 10000000000000000000;
    var taskName = addText.value;
    var taskDescription = text_description.value;
    var status = "Open";
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("nodrop", "task", "editable");
    taskDiv.setAttribute("draggable", "true");
    taskDiv.setAttribute("ondragstart", "drag(event)");
    taskDiv.setAttribute("id", `${newId}`);

    const mark = document.createElement("span");
    mark.classList.add("nodrop", "mark");
    const text = document.createElement("span");
    text.classList.add("text");
    const descriptionDiv = document.createElement("div"); //
    descriptionDiv.classList.add("description_Wrapper"); //
    const descritionText = document.createElement("p"); //
    descritionText.classList.add("description_ptag"); //

    //append all Elements
    descriptionDiv.appendChild(descritionText);
    taskDiv.appendChild(mark);
    taskDiv.appendChild(text);
    taskDiv.appendChild(descriptionDiv);

    document.querySelector(".box1 > .container").appendChild(taskDiv);
    text.innerText = taskName;
    descritionText.innerText = text_description.value;
    text_description.value = "";
    addText.value = "";
    taskStorage.push(createTaskObject(newId, taskName, status, taskDescription));
    saveState();
}

//render Task 
function render() {
    for (let i = 0; i < taskStorage.length; i++) {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("nodrop", "task", "editable");
        taskDiv.setAttribute("draggable", "true");
        taskDiv.setAttribute("ondragstart", "drag(event)");
        taskDiv.setAttribute("id", `${taskStorage[i].id}`);
        const mark = document.createElement("span");
        mark.classList.add("mark");
        const text = document.createElement("span");
        text.classList.add("text");
        const descriptionDiv = document.createElement("div"); //
        descriptionDiv.classList.add("description_Wrapper"); //
        const descritionText = document.createElement("p"); //
        descritionText.classList.add("description_ptag"); //
        descriptionDiv.appendChild(descritionText);
        taskDiv.appendChild(mark);    //append all created element
        taskDiv.appendChild(text);
        taskDiv.appendChild(descriptionDiv);
        text.innerText = taskStorage[i].name;
        if (taskStorage[i].description != "") {
            taskDiv.classList.remove("editable");
        }
        descritionText.innerText = taskStorage[i].description;
        let taskParent; // checking curent box status
        if (taskStorage[i].status === "Open")
            taskParent = document.querySelector(".box1 > .container")
        if (taskStorage[i].status === "In Progress")
            taskParent = document.querySelector(".box2 > .container")
        if (taskStorage[i].status === "In review")
            taskParent = document.querySelector(".box3 > .container")
        if (taskStorage[i].status === "Done")
            taskParent = document.querySelector(".box4 > .container")
        taskParent.appendChild(taskDiv);
    }
}
const deleteTask = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    for (var i = 0; i < taskStorage.length; i++) {
        const taskDeleted = taskStorage[i];
        if (taskDeleted.status == 'Done') {
            return;
        }
        if (data == taskDeleted.id) {
            taskStorage.splice(i, 1);
            location.reload(true);
        }
    }
    saveState();
};
// drag task  
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    dragTarget = ev.target.id
}

//drop task-->event delegation
var targetId;
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    let dropLocation = ev.target.closest(".container")
    if (!ev.target.contains(dropLocation)) {
        dropLocation.append(document.getElementById(data));
        targetId = dropLocation.id
    } else {
        ev.target.append(document.getElementById(data));
        targetId = ev.target.id
    }
    updateStatus(targetId);
    saveState();
}

function allowDrop(ev) {
    ev.preventDefault();
}

var taskStorage = initializeTask();
saveState();
render();

//update status function
function updateStatus(tId) {
    for (let i = 0; i < taskStorage.length; i++) {
        if (dragTarget === taskStorage[i].id) {
            if (tId === "div1")
                taskStorage[i].status = "Open"
            if (tId === "div2")
                taskStorage[i].status = "In Progress"
            if (tId === "div3")
                taskStorage[i].status = "In review"
            if (tId === "div4")
                taskStorage[i].status = "Done"
        }
    }
}

















