import "./styles.css";
import folderIcon from '../images/folder-file.svg';
import plusIcon from '../images/plus-box.svg';

import {Todo, Project} from './project.js';

const projects = [];
let selectedProject = null;

// + btn section for new projects start
const plusBtn = document.querySelector('.plusBtn');
const ctnr4 = document.querySelector('.container4');

plusBtn.addEventListener('click', () => {
  

    // adding div to hold project icon & name
    const project = document.createElement('div');
    project.classList.add('project');

    // adding project icon
    const img = document.createElement('img');
    img.src = folderIcon;
    img.alt = 'Project';

    project.appendChild(img);

    // adding project name input
    const input = document.createElement('input');
    input.classList.add('input');
    input.placeholder = 'Project Name';

    input.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
            const projectName = input.value.trim();
            if(projectName){
                const newProject = new Project(projectName);
                projects.push(newProject); // store in array

                const projectNameDisplay = document.createElement('button');
                projectNameDisplay.classList.add('nameBtn');
                projectNameDisplay.textContent = newProject.name;
                project.appendChild(projectNameDisplay);

                // remove input field
                input.remove();
            }
        }
    })

    project.appendChild(input);

    ctnr4.appendChild(project);

})
// + btn section for new projects end



// project name btn clicked section start

const ctnr3 = document.querySelector('.container3');

ctnr4.addEventListener('click', (event) => {

    if (event.target.classList.contains('nameBtn')) {
        // new
        const projectName = event.target.textContent;
        selectedProject = projects.find(proj => proj.name === projectName);

        const existing = document.querySelector('.card');

        if(!existing){
            // Create a new card when a project name button is clicked
            const card = document.createElement('div');
            card.classList.add('card');

            // Add plus icon to the card
            const plusImg = document.createElement('img');
            plusImg.classList.add('plusImg');
            plusImg.src = plusIcon;
            plusImg.alt = 'Plus icon';
            card.appendChild(plusImg);

            // Add "New Note" message
            const newNote = document.createElement('button');
            newNote.classList.add('newNoteBtn');
            newNote.innerHTML = 'New Note';
            card.appendChild(newNote);

            ctnr3.appendChild(card);
        }
        
        displayNote();
    }
});


// project name btn clicked section end




// new note btn getting clicked start 

ctnr3.addEventListener('click', (event) => {
    if(event.target.classList.contains('newNoteBtn') && selectedProject) {// new

        const exists = document.querySelector('.noteDiv');

        if(!exists){

            const noteDiv = document.createElement('div');
            noteDiv.classList.add('noteDiv');

            const titleInput = document.createElement('input');
            titleInput.classList.add('titleInput', 'todo');
            titleInput.placeholder = 'Title';
            noteDiv.appendChild(titleInput);

            const descInput = document.createElement('input');
            descInput.classList.add('descInput', 'todo');
            descInput.placeholder = 'Description';
            noteDiv.appendChild(descInput);

            const dueDateInput = document.createElement('input');
            dueDateInput.classList.add('dueDateInput', 'todo');
            dueDateInput.placeholder = 'Due Date';
            noteDiv.appendChild(dueDateInput);

            const priorityInput = document.createElement('input');
            priorityInput.classList.add('priorityInput', 'todo');
            priorityInput.placeholder = 'Priority';
            noteDiv.appendChild(priorityInput);


            // save btn for new inputs
            const saveBtn = document.createElement('button');
            saveBtn.classList.add('saveBtn');
            saveBtn.innerHTML = 'Save';
            noteDiv.appendChild(saveBtn);
            saveBtn.addEventListener('click', () => {

                const title = titleInput.value.trim();
                const desc = descInput.value.trim();
                const dueDate = dueDateInput.value.trim();
                const priority = priorityInput.value.trim();

                if(title && desc && dueDate && priority){
                    const newTodo = new Todo(title, desc, dueDate, priority);
                    selectedProject.addTodo(newTodo);

                    // refresh displayed Notes
                    displayNote();
                }

                noteDiv.remove();
            })
             
            ctnr3.appendChild(noteDiv);
        }
    }
})

console.log(projects);

// new note btn getting clicked end

const displayNote = () => {

    const notesContainer = document.querySelector('.notesContainer');
    if (notesContainer) {
        notesContainer.remove();
    }

    // Create new container for notes
    const newNotesContainer = document.createElement('div');
    newNotesContainer.classList.add('notesContainer');

    selectedProject.todos.forEach(todo => {
        const div = document.createElement('div');
        div.classList.add('note');

        div.innerHTML = `
            <h3>${todo.title}</h3>
            <p><strong>Description:</strong> ${todo.description}</p>
            <p><strong>Due Date:</strong> ${todo.dueDate}</p>
            <p><strong>Priority:</strong> ${todo.priority}</p>
        `;

    // Add radio button for completion status
    const statusLabel = document.createElement('label');
    statusLabel.classList.add('label');
    statusLabel.innerHTML = 'Status: ';
    
    const statusButton = document.createElement('input');
    statusButton.classList.add('radio');
    statusButton.type = 'radio';
    statusButton.checked = todo.status; // Sets initial checked state based on status

    // Update status when radio button is clicked
    statusButton.addEventListener('click', () => {
        todo.markComplete();
        statusButton.checked = todo.status; // Reflects the new status after change
    });

    statusLabel.appendChild(statusButton);
    div.appendChild(statusLabel);

        newNotesContainer.appendChild(div);
    });

    ctnr3.appendChild(newNotesContainer);
};















