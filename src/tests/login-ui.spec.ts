//Приклад інтеграційного тесту з MongoDB (UserService) + простий UI через Playwright
import { test, expect } from '../fixtures';
import { User } from '../users';

test.describe('UI Login with MongoDB user', () => {
    let testUser: User;

    test.beforeEach(() => {
        testUser = {
            username: `user_${Date.now()}`,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: '12345',
            phone: '555-5555',
            userStatus: 1,
        };
    });

    test('Create user in DB and login via UI', async ({ page, userService }) => {
        // 1. CREATE USER IN DB
        await userService.createUser(testUser);

        // 2. FAKE UI PAGE
        await page.setContent(`
      <html>
        <body>
          <h1>Login</h1>
          <input id="username" placeholder="Username" />
          <input id="password" type="password" placeholder="Password" />
          <button id="loginBtn">Login</button>
          <p id="welcome" style="display:none"></p>

          <script>
            document.getElementById('loginBtn').addEventListener('click', async () => {
              const username = document.getElementById('username').value;
              const password = document.getElementById('password').value;

              // Симуляція логіки логіну: перевірка пароля
              if (username === "${testUser.username}" && password === "${testUser.password}") {
                const welcome = document.getElementById('welcome');
                welcome.textContent = "Welcome, ${testUser.firstName}";
                welcome.style.display = "block";
              } else {
                alert("Invalid credentials");
              }
            });
          </script>
        </body>
      </html>
    `);

        // 3. LOGIN ACTION
        await page.fill('#username', testUser.username);
        await page.fill('#password', testUser.password);
        await page.click('#loginBtn');

        // 4. ASSERTION
        const welcomeText = await page.textContent('#welcome');
        expect(welcomeText).toBe(`Welcome, ${testUser.firstName}`);
    });
});
//Що тут відбувається
//
// Step 1: Створюємо юзера в MongoDB через твій UserService.
//
// Step 2: Малюємо фейкову HTML сторінку через page.setContent().
//
// Step 3: Тест заповнює логін/пароль, клікає кнопку.
//
// Step 4: Перевіряємо, що на сторінці показався текст Welcome, John.