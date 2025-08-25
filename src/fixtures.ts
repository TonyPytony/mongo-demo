//Це файл з Playwright фікстурами, який дозволяє нам зручно використовувати MongoDB у тестах.
import { test as base } from '@playwright/test';
import { dbPromise } from './db'; // беремо з db.ts
import { UserService } from './users';

type ApiFixtures = {
    userService: UserService;
};

export const test = base.extend<ApiFixtures>({
    userService: async ({}, use) => {
        const db = await dbPromise; // використовуємо URI з environment variable
        const service = new UserService(db);

        await use(service);
    },
});

export { expect } from '@playwright/test';

//Навіщо цей файл потрібен?
//
// Дає DI (dependency injection) для тестів — тобто:
//
// Не треба кожен раз у тестах писати connectToDB та new UserService(...).

// Використовується для організації коду та повторного використання логіки у Playwright тестах.

// Менше дублювання коду (DRY principle).
//
// Легко змінити підключення (наприклад, переключитися з localhost на тестовий кластер у хмарі — міняєш в одному місці).
//
// Чисті тести (логіка створення об'єктів винесена в один файл).