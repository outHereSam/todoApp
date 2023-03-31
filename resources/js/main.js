// Object to store todo data
const data = localStorage.getItem("todoList")
  ? JSON.parse(localStorage.getItem("todoList"))
  : {
      todo: [],
      completed: [],
    };

// SVG icons
const checkSVG = `<svg
width="24"
height="24"
viewBox="0 0 24 24"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M7 5C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H7ZM11 15.414L8.293 12.707L9.707 11.293L11 12.586L14.793 8.793L16.207 10.207L11 15.414Z"
  fill="#999CA3"
/>
</svg>`;

const removeSVG = `<svg
width="16"
height="16"
viewBox="0 0 16 16"
xmlns="http://www.w3.org/2000/svg"
>
<path
  class="fill"
  d="M3.33333 13.3333C3.33333 13.6869 3.47381 14.0261 3.72386 14.2761C3.97391 14.5262 4.31304 14.6667 4.66667 14.6667H11.3333C11.687 14.6667 12.0261 14.5262 12.2761 14.2761C12.5262 14.0261 12.6667 13.6869 12.6667 13.3333V5.33333H14V3.99999H11.3333V2.66666C11.3333 2.31304 11.1929 1.9739 10.9428 1.72385C10.6928 1.4738 10.3536 1.33333 10 1.33333H6C5.64638 1.33333 5.30724 1.4738 5.05719 1.72385C4.80714 1.9739 4.66667 2.31304 4.66667 2.66666V3.99999H2V5.33333H3.33333V13.3333ZM6 2.66666H10V3.99999H6V2.66666ZM5.33333 5.33333H11.3333V13.3333H4.66667V5.33333H5.33333Z"
  fill="#999CA3"
/>
<path
  class="fill"
  d="M6 6.66667H7.33333V12H6V6.66667ZM8.66667 6.66667H10V12H8.66667V6.66667Z"
  fill="#999CA3"
/>
</svg>`;

// When the page first loads, fetch the data from the localStorage and render it on the page
renderTodoList();

// Check if the user pressed Enter, if so check if there was a value
// in the input field. Add the value to the list
document.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    // If the user pressed Enter, get the value of the input field and store it in a variable
    const task = document.getElementById("task").value;

    // If the task has a value add the task to the todo list
    if (task) {
      addTask(task);
      document.getElementById("task").value = "";

      data.todo.push(task);
      dataObjectUpdated();
    }
  }
});

// If data is empty we exit out of the function
function renderTodoList() {
  if (!data.todo.length && !data.completed.length) return;

  data.todo.map((item) => {
    addTask(item);
  });

  data.completed.map((item) => {
    addTask(item, true);
  });
}

function dataObjectUpdated() {
  localStorage.setItem("todoList", JSON.stringify(data));
}

function removeTask() {
  const item = this.parentNode.parentNode;
  const parent = item.parentNode;
  const id = parent.id;
  const value = item.innerText;

  if (id === "todo") {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.todo.indexOf(value), 1);
  }
  dataObjectUpdated();

  parent.removeChild(item);
}

function completeTask() {
  const item = this.parentNode.parentNode;
  const parent = item.parentNode;
  const id = parent.id;

  const value = item.innerText;

  // This toggles the complete state. If the id of the parent of the value is todo,
  // it means it's an item to be completed and vice versa.
  if (id === "todo") {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
  } else {
    data.completed.splice(data.todo.indexOf(value), 1);
    data.todo.push(value);
  }

  dataObjectUpdated();

  // Check if the item should be added to the completed list or the todo list
  const target =
    id === "todo"
      ? document.getElementById("completed")
      : document.getElementById("todo");

  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

function addTask(task, completed) {
  // If completed is true, the list to be added to is the completed list
  const list = completed
    ? document.getElementById("completed")
    : document.getElementById("todo");

  // Create the list item
  const item = document.createElement("li");

  // Create the left div items
  const left = document.createElement("div");
  left.classList.add("left");

  // Create the complete and check buttons
  const complete = document.createElement("button");
  const check = document.createElement("button");

  complete.classList.add("complete");
  check.classList.add("check");

  // Add click even listener for completing item
  complete.addEventListener("click", completeTask);
  check.addEventListener("click", completeTask);

  left.innerText = task;

  left.appendChild(complete);
  left.appendChild(check);

  check.innerHTML = checkSVG;

  const right = document.createElement("div");
  right.classList.add("right");

  const remove = document.createElement("button");
  remove.innerHTML = removeSVG;
  remove.classList.add("remove");

  // Add click event listener for removing item
  remove.addEventListener("click", removeTask);

  right.appendChild(remove);

  item.appendChild(left);
  item.appendChild(right);

  list.insertBefore(item, list.childNodes[0]);
}
