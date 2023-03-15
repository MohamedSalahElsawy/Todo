let input = document.querySelector(".input");
let add = document.querySelector(".add");
let TasksDiv = document.querySelector(".taskes");
// Array of tesk
let arraytask = [];
// check of task of the local stroage
if (localStorage.getItem("tasks")) {
  arraytask = JSON.parse(localStorage.getItem("tasks"));
}
// trigeer get data from local stroage
getdatafromlocalstorage();
// add task
add.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  } else {
    console.log(false);
  }
};

// click on task element
TasksDiv.addEventListener("click", function (e) {
  // delete btn
  if (e.target.classList.contains("del")) {
    // remove ele from local stroage
    deleteElementfromLocal(e.target.parentElement.getAttribute("id"));
    // remove ele from page
    e.target.parentElement.remove();
  }
  // toggel done class
  if (e.target.classList.contains("task")) {
    // toggle completed for the task
    toggleTaskWith(e.target.getAttribute("id"));
    // add class done
    e.target.classList.toggle("done");
  }
});
function addTaskToArray(text) {
  // task data
  const task = {
    id: Date.now(),
    titel: text,
    completed: false,
  };
  // push task to array
  arraytask.push(task);
  // add task to page
  addElementToPage(arraytask);
  // add task to local storage
  addDataLocalStorage(arraytask);
}
///////////////////////////
// create fun add task to page
function addElementToPage(taskpage) {
  // empty tasks div
  TasksDiv.innerHTML = "";
  // loop on Array of tasks
  taskpage.forEach((task) => {
    // create div
    let div = document.createElement("div");
    div.className = "task";
    // check if task is done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("id", task.id);
    div.appendChild(document.createTextNode(task.titel));
    // create delete button
    let span = document.createElement("span");
    span.className = "del";
    span.setAttribute("data-id", task.id);
    span.appendChild(document.createTextNode("Delete"));
    // Add btn to the div
    div.appendChild(span);
    // Add task to the main tasks
    TasksDiv.appendChild(div);
  });
}
////////////////////////////
// craete fun add to local storage
function addDataLocalStorage(taskpage) {
  window.localStorage.setItem("tasks", JSON.stringify(arraytask));
}
function getdatafromlocalstorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementToPage(tasks);
  }
}
////////////////////////////
function deleteElementfromLocal(taskid) {
  arraytask = arraytask.filter((task) => task.id != taskid);
  addDataLocalStorage(arraytask);
}
// ////////////////////
function toggleTaskWith(taskID) {
  for (let i = 0; i < arraytask.length; i++) {
    if (arraytask[i].id == taskID) {
      arraytask[i].completed == false ? arraytask[i].completed = true : arraytask[i].completed = false;
    }
  }
  addDataLocalStorage(arraytask);
}
