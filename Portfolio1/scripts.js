document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Hent verdier fra skjemaet
    const projectName = document.getElementById('projectName').value;
    const projectDescription = document.getElementById('projectDescription').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    // Hent alle mål
    const goals = [];
    document.querySelectorAll('#goals-container div').forEach((goalDiv) => {
        goals.push(goalDiv.textContent);
    });
    
    // Opprett et nytt prosjektobjekt
    const project = {
        name: projectName,
        description: projectDescription,
        startDate: startDate,
        endDate: endDate,
        goals: goals
    };
    
    // Legg til prosjektet i listen
    addProjectToList(project);
    
    // Tøm skjemaet
    document.getElementById('projectForm').reset();
    document.getElementById('goals-container').innerHTML = '';
});

document.getElementById('addGoalButton').addEventListener('click', function() {
    const goalInput = document.getElementById('goalInput');
    const goalText = goalInput.value.trim();

    if (goalText !== '') {
        const goalDiv = document.createElement('div');
        goalDiv.textContent = goalText;

        // Legg til målet i goals-container
        document.getElementById('goals-container').appendChild(goalDiv);

        // Tøm mål-inputen
        goalInput.value = '';
    }
});

function addProjectToList(project) {
    const projectList = document.getElementById('projects');
    
    // Opprett en listeelement for prosjektet
    const projectItem = document.createElement('li');
    projectItem.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <p><strong>Start:</strong> ${project.startDate} | <strong>Slutt:</strong> ${project.endDate}</p>
        <h4>Mål:</h4>
        <ul>
            ${project.goals.map(goal => `<li>${goal}</li>`).join('')}
        </ul>
    `;
    
    projectList.appendChild(projectItem);
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            const projects = data.projects;
            displayProjects(projects);
        })
        .catch(error => console.error('Error loading JSON data:', error));
});

function displayProjects(projects) {
    const projectList = document.getElementById('projects');
    projectList.innerHTML = '';

    projects.forEach(project => {
        const projectItem = document.createElement('li');
        projectItem.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <p><strong>Start:</strong> ${project.startDate} | <strong>Slutt:</strong> ${project.endDate}</p>
            <p><strong>Status:</strong> ${project.status}</p>
            <h4>Mål:</h4>
            <ul>
                ${project.goals.map(goal => `<li>${goal.description}</li>`).join('')}
            </ul>
        `;
        projectList.appendChild(projectItem);
    });
}
