//Цей файл — це сервіс для роботи з колекцією користувачів у MongoDB.
// Він реалізує CRUD-операції (Create, Read, Update, Delete) для сутності User.
import { Db } from 'mongodb';

export interface User {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    userStatus: number;
    [key: string]: unknown;
}

export class UserService {
    constructor(private db: Db) {}

    private collectionName = 'users';

    async createUser(user: User) {
        const result = await this.db.collection(this.collectionName).insertOne(user);
        return result.insertedId;
    }

    async getUser(username: string) {
        return this.db.collection(this.collectionName).findOne({ username });
    }

    async updateUser(username: string, updateData: Partial<User>) {
        const result = await this.db.collection(this.collectionName).updateOne(
            { username },
            { $set: updateData }
        );
        return result.modifiedCount;
    }

    async deleteUser(username: string) {
        const result = await this.db.collection(this.collectionName).deleteOne({ username });
        return result.deletedCount;
    }
}
//Для чого цей файл?
//
// Щоб не писати запити напряму у тестах або бізнес-логіці.
//
// Виносить всю логіку роботи з БД в один клас (DAO / Repository pattern).
//
// Дає типізацію (User і Partial<User>), щоб уникати помилок.