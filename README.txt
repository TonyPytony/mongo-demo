mongo-demo/
├── src/
│   ├── db.ts               # 1. Підключення до MongoDB
│   ├── users.ts            # 2. UserService (CRUD логіка)
│   ├── fixtures.ts         # 3. Інжекція UserService у Playwright
│   ├── tests/
│   │   └── user-crud.spec.ts # 4. Автотести Playwright для CRUD
│   └── index.ts            # 5. Демонстраційний скрипт (ручний запуск)

Ролі файлів

db.ts → Налаштовує підключення до MongoDB (Singleton).

users.ts → Містить UserService (CRUD методи).

fixtures.ts → Інжектить UserService у тести через Playwright Fixtures.

user-crud.spec.ts → Автотест для перевірки CRUD (Create → Read → Update → Delete).

index.ts → Ручний тест, щоб переконатися, що все працює до того, як запускаємо автотести.
Запускаєш index.ts: npm start