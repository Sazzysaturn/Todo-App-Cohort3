let todos = []

function addTodo() {
    console.log("add Button clicked")
    const newTodo = document.querySelector('#add-todo-input').value.trim()
    if(newTodo){
        todos.push(newTodo)
        renderTodos()
    }
    document.querySelector('#add-todo-input').value = ""
}

function deleteTodo(index) {
    todos.splice(index,1)
    renderTodos()
}

function createTodosAndAppend(index) {
    const newTodoEle = document.createElement('div')
    newTodoEle.setAttribute("id", "todo-" + index);
    newTodoEle.setAttribute("class", "todo");
    const todoValue = document.createElement('div')
    todoValue.setAttribute("id", "todo-value-" + index)
    todoValue.innerHTML = todos[index]
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = "Delete"
    deleteBtn.setAttribute("id", "delete-btn-" + index)
    deleteBtn.setAttribute("class", "delete-btn")
    deleteBtn.setAttribute("onclick", "deleteTodo(" + index + ")")
    newTodoEle.appendChild(todoValue)
    newTodoEle.appendChild(deleteBtn)
    document.querySelector("#todo-list").appendChild(newTodoEle) 
}

function createSeparatorAndAppend() {
    const separator = document.createElement('div')
    separator.setAttribute("class", "separator")
    document.querySelector('#todo-list').appendChild(separator)
}

function renderTodos() {
    document.querySelector("#todo-list").innerHTML = "";
    for (let i=0;i<todos.length;i++) {
        createTodosAndAppend(i)
        if(i<todos.length-1) {
            createSeparatorAndAppend()
        }
    }
}