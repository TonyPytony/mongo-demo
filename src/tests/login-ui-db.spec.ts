// Опис: Тест, який створює користувача в БД, потім імітує UI для логіну та перевіряє успішний вхід.
// Потім видаляє користувача з БД.
// Використовуємо параметризацію для різних юзерів.
import { test, expect} from '../fixtures';
import { testUsers } from './test-data'; // масив юзерів для параметризації

test.describe('DB + UI Integration Flow', () => {

    for (const user of testUsers) {
        test(`DB + UI flow for ${user.username}`, async ({ page, userService }) => {
            // -----------------------
            // 1. CREATE USER IN DB
            // -----------------------
            await userService.createUser(user);

            // -----------------------
            // 2. FAKE UI PAGE (імітуємо UI)
            // -----------------------
            await page.setContent(`
      <html>
        <body>
          <h1>Login</h1>
          <input id="username" placeholder="Username" />
          <input id="password" type="password" placeholder="Password" />
          <button id="loginBtn">Login</button>
          <p id="welcome" style="display:none"></p>

          <script>
            document.getElementById('loginBtn').addEventListener('click', () => {
              const username = document.getElementById('username').value;
              const password = document.getElementById('password').value;
              if (username === "${user.username}" && password === "${user.password}") {
                const welcome = document.getElementById('welcome');
                welcome.textContent = "Welcome, ${user.firstName}";
                welcome.style.display = "block";
              } else {
                alert("Invalid credentials");
              }
            });
          </script>
        </body>
      </html>
      `);

            // -----------------------
            // 3. LOGIN ACTION
            // -----------------------
            await page.fill('#username', user.username);
            await page.fill('#password', user.password);
            await page.click('#loginBtn');

            // -----------------------
            // 4. ASSERTION
            // -----------------------
            const welcomeText = await page.textContent('#welcome');
            expect(welcomeText).toBe(`Welcome, ${user.firstName}`);

            // -----------------------
            // 5. CLEANUP (teardown)
            // -----------------------
            await userService.deleteUser(user.username);
        });
    }
});
// Чому цей тест корисний?
// Він перевіряє інтеграцію між UI і реальною БД через створення користувача.
// Це допомагає виявити проблеми, які можуть виникнути лише при реальній взаємодії з базою даних.
// Параметризація дозволяє легко додавати нових користувачів для тестування різних сценаріїв.

//Пояснення
//
// Параметризація: Тест автоматично проходить по всіх користувачах із testUsers.
//
// DB інтеграція: Створюємо користувача через UserService перед UI-тестом.
//
// UI інтеграція: Використовуємо page.setContent() для імітації сторінки логіну (фейкова UI логіка).
//
// Ассерти: Перевірка тексту привітання після логіну.
//
// Teardown: Користувача видаляємо після тесту.
//
// Allure-ready: Всі кроки будуть видно в репорті.