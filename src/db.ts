//Цей файл — це модуль для підключення до MongoDB. Він робить роботу з базою зручною та безпечною.
import { MongoClient, Db } from 'mongodb';

let db: Db;

export async function connectToDB(uri: string, dbName: string): Promise<Db> {
    if (db) return db; // singleton pattern: підключаємося лише один раз

    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000, // таймаут підключення
    });

    try {
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(dbName);
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}
//Для чого це потрібно?
//
// Щоб не дублювати код підключення у кожному файлі.
//
// Щоб уникнути декількох підключень (це може перевантажити БД).
//
// Щоб мати єдиний центр керування підключенням.