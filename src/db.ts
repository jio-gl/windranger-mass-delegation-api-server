import DatabaseConstructor, {Database} from 'better-sqlite3'
import * as fs from 'fs'

const DBSOURCE = ':memory:'

const db: Database = new DatabaseConstructor(DBSOURCE)

const dataSql: string = fs.readFileSync('./scripts/sql/create.sql').toString()

db.exec(dataSql)

export default db
