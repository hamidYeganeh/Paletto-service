import type { FastifyReply, FastifyRequest } from "fastify";
import {
  createUserService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
} from "../../services/userService";

export async function createUser(
  req: FastifyRequest<{ Body: { name?: string; email?: string } }>,
  res: FastifyReply,
) {
  try {
    const body = req.body;
    if (!body?.name || !body?.email)
      return res.status(400).send({ error: "name and email required" });
    const user = await createUserService(body.name, body.email);
    return res.status(201).send({ user });
  } catch {
    return res.status(500).send({ error: "internal error" });
  }
}

export async function getUser(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply,
) {
  const id = String((req.params as { id: string }).id || "");
  if (!id) return res.status(400).send({ error: "id param required" });
  try {
    const user = await getUserByIdService(id);
    if (!user) return res.status(404).send({ error: "user not found" });
    return res.send({ user });
  } catch {
    return res.status(500).send({ error: "internal error" });
  }
}

export async function updateUser(
  req: FastifyRequest<{ Params: { id: string }; Body: { name?: string; email?: string } }>,
  res: FastifyReply,
) {
  const id = String((req.params as { id: string }).id || "");
  if (!id) return res.status(400).send({ error: "id param required" });
  try {
    const body = req.body;
    const update: Record<string, string> = {};
    if (body?.name) update.name = String(body.name);
    if (body?.email) update.email = String(body.email);
    if (Object.keys(update).length === 0)
      return res.status(400).send({ error: "no fields to update" });
    const user = await updateUserByIdService(id, update);
    if (!user) return res.status(404).send({ error: "user not found" });
    return res.send({ user });
  } catch {
    return res.status(500).send({ error: "internal error" });
  }
}

export async function deleteUser(
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply,
) {
  const id = String((req.params as { id: string }).id || "");
  if (!id) return res.status(400).send({ error: "id param required" });
  try {
    const ok = await deleteUserByIdService(id);
    if (!ok) return res.status(404).send({ error: "user not found" });
    return res.status(204).send();
  } catch {
    return res.status(500).send({ error: "internal error" });
  }
}
