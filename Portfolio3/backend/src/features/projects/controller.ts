import type { Project, Goal } from "./types";
import type { ProjectRepository } from "./repository";
import { Request, Response } from "express";


import { Router } from 'express';
import { projectService } from './service';

const router = Router();

router.post('/projects', async (req: Request, res: Response) => {
    try {
        const { id, name, description, startDate, endDate, status } = req.body;
        const result = await projectService.createProject({
            id,
            name,
            description,
            startDate,
            endDate,
            status,
            goals: [],
        });

        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }

        res.status(201).json({ data: result.data });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;

export const createProjectController = (service: ProjectRepository) => ({
  async createProject(req: Request, res: Response) {
    const result = await service.create(req.body as Project);
    if (result.success) res.status(201).json(result.data);
    else res.status(500).json(result.error);
  },
  async getProject(req: Request, res: Response) {
    const result = await service.getById(req.params.id);
    if (result.success) res.status(200).json(result.data);
    else res.status(404).json(result.error);
  },
  async listProjects(req: Request, res: Response) {
    const result = await service.list();
    if (result.success) res.status(200).json(result.data);
    else res.status(500).json(result.error);
  },
});