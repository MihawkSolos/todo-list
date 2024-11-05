export class Todo {
    constructor(title, description, dueDate, priority, notes = '', status = false){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.status = status;
    }

    markComplete() {
        this.status = true;
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

    removeTodo(todoTitle) {
        this.todos = this.todos.filter(todo => todo.title !== todoTitle);
    }
}
