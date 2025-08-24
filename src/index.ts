//Цей файл — демонстраційний скрипт для ручного запуску CRUD-операцій (Create, Read, Update, Delete) без тестового фреймворку.
import { connectToDB } from './db.js';
import { UserService, User } from './users.js';

(async () => {
    const db = await connectToDB('mongodb://localhost:27017', 'test-db');
    const userService = new UserService(db);

    const newUser: User = {
        username: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: '12345',
        phone: '555-5555',
        userStatus: 1,
    };

    // CREATE
    const userId = await userService.createUser(newUser);
    console.log('Created User ID:', userId);

    // READ
    const user = await userService.getUser('john_doe');
    console.log('Read User:', user);

    // UPDATE
    const updatedCount = await userService.updateUser('john_doe', { firstName: 'Jonathan' });
    console.log('Updated Count:', updatedCount);

    // DELETE
    const deletedCount = await userService.deleteUser('john_doe');
    console.log('Deleted Count:', deletedCount);
})();
//Для чого він потрібен?
//
// Перевірка, що логіка працює перед тим, як писати автоматизовані тести.
//
// Швидкий мануальний тест CRUD без Playwright чи інших інструментів.
//
// Приклад використання сервісу (UserService) у чистому вигляді.

//Чим він відрізняється від тесту у Playwright?
//
// Тут немає expect і перевірок → ти просто дивишся на console.log.
//
// Немає fixtures і dependency injection → усе створюється вручну.
//
// Це підходить для дебагу або навчання, але не для CI/CD.