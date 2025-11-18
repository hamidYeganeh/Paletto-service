import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URL || ''
const dbName = process.env.MONGO_DB_NAME || 'paletto'

let client: MongoClient | null = null

export async function getDb() {
  if (!uri) throw new Error('MONGO_URL is not set')
  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
  }
  return client.db(dbName)
}

export async function closeDb() {
  if (client) {
    await client.close()
    client = null
  }
}