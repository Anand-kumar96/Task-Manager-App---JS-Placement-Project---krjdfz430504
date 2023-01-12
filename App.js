const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const box3 = document.querySelector(".box3");
const box4 = document.querySelector(".box4");
const addTask = document.querySelector(".add_Task");
const addText = document.querySelector(".add_name");
var text_description = document.querySelector(".text_description");
const btn_Save = document.querySelector(".btn_Save");
const btn_Cancel = document.querySelector(".btn_Cancel");
const btn_Done = document.querySelectorAll(".btn_done");
const allContainer = document.querySelectorAll(".container");

var localStorageKey = "taskmanager";
var dragTarget;

// initialize the Task 
function initializeTask() {
    var state = localStorage.getItem(localStorageKey)
    if (!state) {
        return []
    }
    return JSON.parse(state)
}

const taskStorage = initializeTask();

// saveState function
function saveState() {
    var state = JSON.stringify(taskStorage)
    localStorage.setItem(localStorageKey, state);
}
//render function
const render = () => {
    for (const element of allContainer) {
        element.innerText = "";
    }
    taskStorage.forEach((task) => {
        const taskNode = createNewTask(task);
        let taskParent;                  // checking curent box status
        if (task.status === "Open")
            taskParent = document.querySelector(".box1 > .container")
        if (task.status === "In Progress")
            taskParent = document.querySelector(".box2 > .container")
        if (task.status === "In review")
            taskParent = document.querySelector(".box3 > .container")
        if (task.status === "Done")
            taskParent = document.querySelector(".box4 > .container")
        taskParent.appendChild(taskNode);
    });
}

// creating each time new task
const createNewTask = (task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("nodrop", "task", "editable");
    taskDiv.setAttribute("draggable", "true");
    taskDiv.setAttribute("ondragstart", "drag(event)");
    taskDiv.setAttribute("id", task.id);
    const mark = document.createElement("span");
    mark.classList.add("nodrop", "mark");
    const text = document.createElement("span");
    text.classList.add("text");
    const descriptionDiv = document.createElement("div"); 
    descriptionDiv.classList.add("description_Wrapper"); 
    const descritionText = document.createElement("p"); 
    descritionText.classList.add("description_ptag"); 

    //append all Elements
    descriptionDiv.appendChild(descritionText);
    taskDiv.appendChild(mark);
    taskDiv.appendChild(text);
    taskDiv.appendChild(descriptionDiv);

    text.innerText = task.name;
    descritionText.innerText = task.description;
    return taskDiv;
}

//delete task
const deleteTask = (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    for (var i = 0; i < taskStorage.length; i++) {
        const taskDeleted = taskStorage[i];
        // console.log(taskDeleted.id)
        // console.log(data)
        if (data === taskDeleted.id && taskDeleted.status!='Done') {
            taskStorage.splice(i, 1);
            saveState();
            render();
            return;
        }
    }

};

let text_value;
// event listener for each new taskadded
addTask.addEventListener("submit", (e) => {
    e.preventDefault();
    if (addText.value == "") {
        alert("input can't be empty");
        return;
    } else {
        document.querySelector(".modal-content").style.visibility = "visible";
        document.querySelector(".modal-content").style.zIndex = "1";
        text_value = addText.value.trim(" ");
    }
});

// eventListener to save the task
btn_Save.addEventListener("click", (el) => {
    el.preventDefault();
    if (text_description.value == "") {
        alert("please enter the description");
        return;
    }
    const des_value = text_description.value;
    const taskObject = createTaskObject(text_value, des_value);
    taskStorage.unshift(taskObject);
    addText.value = "";
    text_description.value = "";
    saveState();
    render();
    document.querySelector(".modal-content").style.visibility = "hidden";
});

// eventListener to Cancel the task
btn_Cancel.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".modal-content").style.visibility = "hidden";
    addText.value = "";
    text_description.value = "";
    return;
});

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
    let dropPlace = ev.target.closest(".container")
    if (!ev.target.contains(dropPlace)) {
        dropPlace.append(document.getElementById(data));
        targetId = dropPlace.id
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

//creating taskObject
const createTaskObject = (addText, des_value) => {
    return {
        id: 'u' + Math.random() * 10000000000000000000,
        name: addText,
        status: "Open",
        description: des_value,
    };
};

// updating status of each box
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

saveState();
render();














