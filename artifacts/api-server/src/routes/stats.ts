import { Router, type IRouter } from "express";
import { db, projectsTable, contactMessagesTable } from "@workspace/db";
import { sql } from "drizzle-orm";
import { GetStatsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/stats", async (req, res): Promise<void> => {
  const [projectStats] = await db
    .select({
      totalProjects: sql<number>`count(*)::int`,
      totalViews: sql<number>`coalesce(sum(${projectsTable.viewCount}), 0)::int`,
    })
    .from(projectsTable);

  const [messageStats] = await db
    .select({
      totalMessages: sql<number>`count(*)::int`,
    })
    .from(contactMessagesTable);

  const stats = {
    totalProjects: projectStats?.totalProjects ?? 0,
    totalViews: projectStats?.totalViews ?? 0,
    totalMessages: messageStats?.totalMessages ?? 0,
  };

  res.json(GetStatsResponse.parse(stats));
});

export default router;
