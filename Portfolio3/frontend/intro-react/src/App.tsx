import ProjectPage from './pages/ProjectPage';
import './App.css';


import express from 'express';
import projectsRoutes from './../../../backend/src/features/projects/controller';

const app = express();
app.use(express.json());

app.use('/api', projectsRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));

const App: React.FC = () => (
    <ProjectPage />
);

export default App;