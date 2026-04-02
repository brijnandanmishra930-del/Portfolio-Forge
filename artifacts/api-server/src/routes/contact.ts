import { Router, type IRouter } from "express";
import { db, contactMessagesTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [message] = await db
    .insert(contactMessagesTable)
    .values(parsed.data)
    .returning();

  res.status(201).json({
    id: message.id,
    name: message.name,
    email: message.email,
    message: message.message,
    createdAt: message.createdAt,
  });
});

export default router;
