import { ObjectId } from "mongodb";
import { getDb } from "../db";
import type { UserDoc, UserDTO } from "../models/user";
import { toUserDTO } from "../models/user";

export async function createUserService(
  name: string,
  email: string
): Promise<UserDTO> {
  const db = await getDb();
  const user: UserDoc = {
    _id: new ObjectId(),
    name: String(name),
    email: String(email),
  };
  await db.collection<UserDoc>("users").insertOne(user);
  return toUserDTO(user);
}

export async function getUserByIdService(id: string): Promise<UserDTO | null> {
  const db = await getDb();
  const doc = await db
    .collection<UserDoc>("users")
    .findOne({ _id: new ObjectId(String(id)) });
  return doc ? toUserDTO(doc) : null;
}

export async function updateUserByIdService(
  id: string,
  update: Partial<Pick<UserDoc, "name" | "email">>
): Promise<UserDTO | null> {
  const db = await getDb();
  await db
    .collection<UserDoc>("users")
    .updateOne({ _id: new ObjectId(String(id)) }, { $set: update });
  const doc = await db
    .collection<UserDoc>("users")
    .findOne({ _id: new ObjectId(String(id)) });
  return doc ? toUserDTO(doc) : null;
}

export async function deleteUserByIdService(id: string): Promise<boolean> {
  const db = await getDb();
  const result = await db
    .collection<UserDoc>("users")
    .deleteOne({ _id: new ObjectId(String(id)) });
  return result.deletedCount === 1;
}
