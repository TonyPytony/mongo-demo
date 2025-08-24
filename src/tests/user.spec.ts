//Це Playwright-тест, який перевіряє наш UserService і CRUD-операції в MongoDB.
import { test, expect } from '../fixtures';
import { User } from '../users';

test.describe('MongoDB UserService CRUD', () => {
    let testUser: User;

    test.beforeEach(() => {
        testUser = {
            username: `john_${Date.now()}`,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: '12345',
            phone: '555-5555',
            userStatus: 1,
        };
    });

    test('Create -> Read -> Update -> Delete user', async ({ userService }) => {
        // CREATE
        const userId = await userService.createUser(testUser);
        expect(userId).toBeTruthy();

        // READ
        const userFromDb = await userService.getUser(testUser.username);
        expect(userFromDb).toMatchObject(testUser);

        // UPDATE
        const updatedCount = await userService.updateUser(testUser.username, { firstName: 'Jonathan' });
        expect(updatedCount).toBe(1);

        const updatedUser = await userService.getUser(testUser.username);
        expect(updatedUser?.firstName).toBe('Jonathan');

        // DELETE
        const deletedCount = await userService.deleteUser(testUser.username);
        expect(deletedCount).toBe(1);

        // VERIFY DELETE
        const deletedUser = await userService.getUser(testUser.username);
        expect(deletedUser).toBeNull();
    });
});
//Для чого цей тест потрібен?
//
// Він не тестує UI або API, а перевіряє безпосередньо інтеграцію з MongoDB.
//
// Це корисно для:
//
// Інтеграційних тестів (коли хочемо бути впевненими, що наш код працює з реальною БД).
//
// Тестових фікстур для E2E (наприклад, створити користувача перед UI-тестом).
//
// CI/CD перевірки, що CRUD логіка не зламана.