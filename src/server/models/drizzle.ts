import { drizzle } from 'drizzle-orm/better-sqlite3'
import { app } from 'electron'

import fs from 'fs'
import path from 'path'
import * as schema from './schemas'
import Database from 'better-sqlite3'

const dbPath = import.meta.env.DEV ? 'sqlite.db' : path.join(app.getPath('userData'), 'data.db')

fs.mkdirSync(path.dirname(dbPath), { recursive: true })

const sqlite = new Database(dbPath)

export const db = drizzle(sqlite, { schema })
