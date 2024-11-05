import "./styles.css";
import folderIcon from '../images/folder-file.svg';

import {Todo, Project} from './project.js';

const projects = [];

// + btn section for new projects start
const plusBtn = document.querySelector('.plusBtn');

plusBtn.addEventListener('click', () => {
    const ctnr4 = document.querySelector('.container4');

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

