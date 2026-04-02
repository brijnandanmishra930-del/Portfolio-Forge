import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, projectsTable } from "@workspace/db";
import {
  ListProjectsResponse,
  GetProjectParams,
  GetProjectResponse,
  IncrementProjectViewParams,
  IncrementProjectViewResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/projects", async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(projectsTable)
    .orderBy(projectsTable.displayOrder);

  const projects = rows.map((p) => ({
    ...p,
    tags: p.tags ?? [],
  }));

  res.json(ListProjectsResponse.parse(projects));
});

router.get("/projects/:id", async (req, res): Promise<void> => {
  const params = GetProjectParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [project] = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.id, params.data.id));

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.json(GetProjectResponse.parse({ ...project, tags: project.tags ?? [] }));
});

router.post("/projects/:id/view", async (req, res): Promise<void> => {
  const params = IncrementProjectViewParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [project] = await db
    .update(projectsTable)
    .set({ viewCount: sql`${projectsTable.viewCount} + 1` })
    .where(eq(projectsTable.id, params.data.id))
    .returning();

  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.json(IncrementProjectViewResponse.parse({ ...project, tags: project.tags ?? [] }));
});

export default router;
