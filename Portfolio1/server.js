import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();
let projects = [];

// Routes as before
app.post('/projects', async (c) => {
    try {
        const project = await c.req.json();
        project.id = Date.now();
        projects.push(project);
        return c.json({ message: 'Project added successfully', project });
    } catch (error) {
        return c.json({ error: 'Failed to add project' }, 500);
    }
});

app.get('/projects', (c) => {
    return c.json({ projects });
});

// Start server
serve(app, { port: 3000 }, () => {
    console.log('Hono server is running on http://localhost:3000');
});
