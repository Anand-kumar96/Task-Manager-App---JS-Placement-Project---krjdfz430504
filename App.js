const inc1 = document.querySelector(".innerContent1");
const inc2 = document.querySelector(".innerContent2");
const inc3 = document.querySelector(".innerContent3");
const inc4 = document.querySelector(".innerContent4");
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const box3 = document.querySelector(".box3");
const box4 = document.querySelector(".box4");
var localStorageKey = "taskmanager"
var dragTarget;

//local storage
var taskStorage = [];
// initialize the Task 
function initializeTask() {
    var state = localStorage.getItem(localStorageKey)
    if (!state) {
        return []
    }
    return JSON.parse(state)
}
// saving the state
function saveState() {
    var state = JSON.stringify(taskStorage)
    localStorage.setItem(localStorageKey, state);
}
// creating Object
function createTaskObject(uId, taskName, stat, des) {
    return {
        id: uId,
        name: taskName,
        status: stat,
        description: des,
    }
}

// to add task name----1
const addTask = document.querySelector(".add_Task");
const addText = document.querySelector(".add_name");
const text_front = document.querySelector(".text_front");

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

// to add task description----1
var description = document.querySelector(".text_description");
const btn_Save = document.querySelector(".btn_Save");
const btn_Cancel = document.querySelector(".btn_Cancel");

btn_Save.addEventListener("click", (el) => {
    el.preventDefault();
    if (description.value == "") {
        alert("please enter the description");
    }
    document.querySelector(".modal-content").style.visibility = "hidden";
    newTaskAdded();
});

btn_Cancel.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".modal-content").style.visibility = "hidden";
    addText.value = "";
    return;
});
// creating each time new task
function newTaskAdded() {
    var newId = 'u' + Math.random() * 10000000000000000000;
    var taskName = addText.value;
    var taskDescription = description.value;
    var status = "Open";
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("nodrop", "task");
    taskDiv.setAttribute("draggable", "true");
    taskDiv.setAttribute("ondragstart", "drag(event)");
    taskDiv.setAttribute("id", `${newId}`);
    const mark = document.createElement("span");
    mark.classList.add("nodrop", "mark");
    const text = document.createElement("span");
    text.classList.add("nodrop", "text");
    const button = document.createElement("button");
    button.classList.add("btn", "nodrop");
    button.setAttribute("onclick", "displayTask(event)")
    button.setAttribute("id", `${newId}`);
    //append all
    taskDiv.appendChild(mark);
    taskDiv.appendChild(text);
    taskDiv.appendChild(button);
    document.querySelector(".box1 > .container").appendChild(taskDiv);
    text.innerText = taskName;
    description.value = "";
    addText.value = "";
    taskStorage.push(createTaskObject(newId, taskName, status, taskDescription));
    saveState();
}

//rendering function
function render() {
    for (let i = 0; i < taskStorage.length; i++) {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("nodrop", "task");
        taskDiv.setAttribute("draggable", "true");
        taskDiv.setAttribute("ondragstart", "drag(event)");
        taskDiv.setAttribute("id", `${taskStorage[i].id}`);
        const mark = document.createElement("span");
        mark.classList.add("nodrop", "mark");
        const text = document.createElement("span");
        text.classList.add("nodrop", "text");
        const button = document.createElement("button");
        button.classList.add("btn", "nodrop");
        button.setAttribute("onclick", "displayTask(event)")
        button.setAttribute("id", `${taskStorage[i].id}`);

        taskDiv.appendChild(mark);    //append all created element
        taskDiv.appendChild(text);
        taskDiv.appendChild(button);
        text.innerText = taskStorage[i].name;

        let taskParent; // checking curent box
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
// for drag and drop 
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    dragTarget = ev.target.id
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (ev.target.classList.contains("nodrop")) {
        return;
    }
    ev.target.append(document.getElementById(data));
    var targetId = ev.target.id
    updateStatus(targetId);
    saveState();
}

function allowDrop(ev) {
    ev.preventDefault();
}
function displayTask(e) {
    for (let i = 0; i < taskStorage.length; i++) {
        if (taskStorage[i].id == e.target.id) {
            const box = e.target.parentNode.parentNode.parentNode;
            if (box.classList == "box1") {
                var innerContent = inc1;
            } else if (box.classList == "box2") {
                innerContent = inc2;
            } else if (box.classList == "box3") {
                innerContent = inc3;
            } else {
                innerContent = inc4;
            }
            box.style.visibility = "hidden";
            innerContent.style.visibility = "visible";
            innerContent.querySelector(".text_container").innerText = taskStorage[i].name;
            innerContent.querySelector(".textareaValue").innerText = taskStorage[i].description;
        }
    }
}

// code for to hide innerContent
const btn_Done = document.querySelectorAll(".btn_done");
btn_Done.forEach((element) => {
    element.addEventListener("click", (el) => {
        el.preventDefault();
        const innerCont = el.target.parentNode.parentNode.parentNode;
        if (innerCont.classList == "innerContent1") {
            var boxes = box1;
        } else if (innerCont.classList == "innerContent2") {
            boxes = box2;
        } else if (innerCont.classList == "innerContent3") {
            boxes = box3;
        } else {
            boxes = box4;
        }

        innerCont.style.visibility = "hidden";
        boxes.style.visibility = "visible";
    });
});

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
var taskStorage = initializeTask()
render();
















