[![CI Playwright Tests](https://github.com/TonyPytony/mongo-demo/actions/workflows/test.yml/badge.svg?branch=develop)](https://github.com/TonyPytony/mongo-demo/actions/workflows/test.yml)
mongo-demo/
├── src/
│   ├── db.ts               # 1. Підключення до MongoDB
│   ├── users.ts            # 2. UserService (CRUD логіка)
│   ├── fixtures.ts         # 3. Інжекція UserService у Playwright
│   ├── tests/
│   │   └── user-crud.spec.ts # 4. Автотести Playwright для CRUD
│   └── index.ts            # 5. Демонстраційний скрипт (ручний запуск)
├── package.json           # 6. Залежності та скрипти
├── tsconfig.json          # 7. Налаштування TypeScript
└── README.txt             # 8. Цей файл

Ролі файлів

db.ts → Налаштовує підключення до MongoDB (Singleton).

users.ts → Містить UserService (CRUD методи).

fixtures.ts → Інжектить UserService у тести через Playwright Fixtures.

user-crud.spec.ts → Автотест для перевірки CRUD (Create → Read → Update → Delete).

index.ts → Ручний тест, щоб переконатися, що все працює до того, як запускаємо автотести.
Запускаєш index.ts: npm start
Запускаєш тести: npx playwright test