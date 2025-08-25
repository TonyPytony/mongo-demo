import { MongoClient, Db } from 'mongodb';

let db: Db;

export async function connectToDB(uri: string, dbName: string): Promise<Db> {
    if (db) return db; // singleton

    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });

    try {
        await client.connect();
        console.log(`✅ Connected to MongoDB: ${dbName}`);
        db = client.db(dbName);
        return db;
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        throw error;
    }
}

/**
 * Формуємо URI залежно від середовища
 * - Для локальної MongoDB: 'mongodb://localhost:27017'
 * - Для CI/GitHub Actions: 'mongodb://root:example@mongodb:27017'
 */
const isCI = process.env.CI === 'true';

const mongoHost = isCI ? 'mongodb' : 'localhost';
const mongoPort = '27017';
const dbName = process.env.DB_NAME || 'test-db';

const mongoUser = isCI ? 'root' : '';
const mongoPass = isCI ? 'example' : '';

const mongoUri = isCI
    ? `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/${dbName}`
    : `mongodb://${mongoHost}:${mongoPort}`;

export const dbPromise = connectToDB(mongoUri, dbName);
