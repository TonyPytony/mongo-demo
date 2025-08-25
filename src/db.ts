import { MongoClient, Db } from 'mongodb';

let db: Db;

/**
 * Підключення до MongoDB з singleton-патерном
 * @param uri - MongoDB URI (наприклад process.env.MONGO_URI)
 * @param dbName - назва бази
 */
export async function connectToDB(uri: string, dbName: string): Promise<Db> {
    if (db) return db; // singleton: не підключаємося повторно

    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000, // таймаут підключення
    });

    try {
        await client.connect();
        console.log(`✅ Connected to MongoDB: ${dbName}`);
        db = client.db(dbName);
        return db;
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error);
        throw error; // кинемо помилку, Playwright відловить
    }
}

// Використання за замовчуванням (для тестів)
export const dbPromise = connectToDB(
    process.env.MONGO_URI || 'mongodb://localhost:27017',
    process.env.DB_NAME || 'test-db'
);
