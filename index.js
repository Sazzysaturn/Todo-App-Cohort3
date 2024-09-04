let todos = localStorage.getItem("myTodoList") ? JSON.parse(localStorage.getItem("myTodoList")).todos:[];
let isEditing = localStorage.getItem("myTodoList") ? JSON.parse(localStorage.getItem("myTodoList")).isEditing:[];
let isChecked = localStorage.getItem("myTodoList") ? JSON.parse(localStorage.getItem("myTodoList")).isChecked:[];

function addTodo() {
  const newTodo = document.querySelector("#add-todo-input").value.trim();
  if (newTodo) {
    todos.push(newTodo);
    isEditing.push(false);
    isChecked.push(false);
    localStorage.setItem("myTodoList", JSON.stringify({todos,isEditing,isChecked}))
    renderTodos();
  }
  document.querySelector("#add-todo-input").value = "";
}

function deleteTodo(index) {
  todos.splice(index, 1);
  isEditing.splice(index, 1);
  isChecked.splice(index, 1);
  localStorage.setItem("myTodoList", JSON.stringify({todos,isEditing,isChecked}))
  renderTodos();
}

function updateTodo(index) {
  if (isEditing[index]) {
    todos[index] = document.querySelector("#edit-todo-" + index).value;
    isEditing[index] = false;
  } else {
    isEditing[index] = true;
  }
  localStorage.setItem("myTodoList", JSON.stringify({todos,isEditing,isChecked}))
  renderTodos();
}

function checkTodo(index) {
  if (isChecked[index]) {
    isChecked[index] = false;
  } else {
    isChecked[index] = true;
  }
  localStorage.setItem("myTodoList", JSON.stringify({todos,isEditing,isChecked}))
  renderTodos();
}

function createTodosAndAppend(index) {
  // creating main todo element
  const newTodoEle = document.createElement("div");
  newTodoEle.setAttribute("id", "todo-" + index);
  newTodoEle.setAttribute("class", "todo");

  // creating the left side of todo where checkbox and actual todo value is there
  if (!isEditing[index]) {
    const todoValue = document.createElement("div");
    todoValue.setAttribute("id", "todo-value-" + index);
    todoValue.setAttribute("class", "todo-value");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("onchange", "checkTodo(" + index + ")");
    if(isChecked[index]) {
        checkbox.setAttribute("checked", '');
    }
    todoValue.appendChild(checkbox);

    const todoText = document.createElement("div");
    if (!isChecked[index]) {
      todoText.innerHTML = todos[index];
    } else {
      todoText.innerHTML = "<s>" + todos[index] + "</s>";
    }
    todoValue.appendChild(todoText);

    newTodoEle.appendChild(todoValue);
  } else {
    const editBox = document.createElement("input");
    editBox.setAttribute("id", "edit-todo-" + index);
    editBox.setAttribute("class", "edit-todo-box");
    editBox.value = todos[index];
    
    newTodoEle.appendChild(editBox);
  }

  // creating the right side of todo where edit/save and delete button is there
  const buttons = document.createElement("div");
  buttons.setAttribute("class", "buttons");

  if (!isChecked[index]) {
    const editBtn = document.createElement("button");
    if (!isEditing[index]) {
      editBtn.innerHTML = "Edit";
    } else {
      editBtn.innerHTML = "Save";
    }
    editBtn.setAttribute("id", "edit-btn-" + index);
    editBtn.setAttribute("class", "edit-btn");
    editBtn.setAttribute("onclick", "updateTodo(" + index + ")");
    buttons.appendChild(editBtn);
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  deleteBtn.setAttribute("id", "delete-btn-" + index);
  deleteBtn.setAttribute("class", "delete-btn");
  deleteBtn.setAttribute("onclick", "deleteTodo(" + index + ")");
  buttons.appendChild(deleteBtn);

  newTodoEle.appendChild(buttons);

  // appending the todo element in the list of todos
  document.querySelector("#todo-list").appendChild(newTodoEle);
}

function createSeparatorAndAppend() {
  const separator = document.createElement("div");
  separator.setAttribute("class", "separator");
  document.querySelector("#todo-list").appendChild(separator);
}

function renderTodos() {
  document.querySelector("#todo-list").innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    createTodosAndAppend(i);
    if (i < todos.length - 1) {
      createSeparatorAndAppend();
    }
  }
}

renderTodos()