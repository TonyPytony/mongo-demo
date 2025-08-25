import { test as base } from '@playwright/test';
import { dbPromise } from './db';
import { UserService } from './users';

type ApiFixtures = {
    userService: UserService;
};

export const test = base.extend<ApiFixtures>({
    userService: async ({}, use) => {
        const db = await dbPromise;
        const service = new UserService(db);
        await use(service);
    },
});

export { expect } from '@playwright/test';
