export class Todo {
    constructor(title, description, dueDate, priority, status = false){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }

    markComplete() {
        this.status = !this.status;
    }
}

export class Project {
    constructor(name){
        this.name = name;
        this.todos = [];
    }

    addTodo (todo) {
        this.todos.push(todo);
    }

    printTodo (todo) {
        for(let i = 0; i < todo.length; i++){
            console.log(i);
        }
    }

    removeTodo(todoTitle) {
        this.todos = this.todos.filter(todo => todo.title !== todoTitle);
    }
}

