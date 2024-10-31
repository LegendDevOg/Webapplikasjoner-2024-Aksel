// frontend/src/App.tsx
import React from 'react';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import './App.css';

function App() {
    return (
        <div className="App">
            <header>
                <h1>Prosjektoversikt</h1>
            </header>
            <div className="container">
                <div id="project-list">
                    <ProjectList />
                </div>
                <div id="new-project-form">
                    <ProjectForm />
                </div>
            </div>
        </div>
    );
}

export default App;
