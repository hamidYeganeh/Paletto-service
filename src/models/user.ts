import { ObjectId } from 'mongodb'

export type UserDoc = { _id: ObjectId; name: string; email: string }
export type UserDTO = { _id: string; name: string; email: string }

export function toUserDTO(doc: UserDoc): UserDTO {
  return { _id: String(doc._id), name: doc.name, email: doc.email }
}