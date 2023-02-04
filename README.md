# Post-backend NestJS
Была написана логика:
- Регистрация
- Авторизация
- Содание поста
- Получение всех постов
---
Перед началом работы нужно выполнить следующие действия:
1) Скачать данную папку
2) Разархивировать файл
3) В корневой папке "post-backend" создать файл '.env'
4) В созданном файле '.env' добавить следующие переменные:
    - "DB_URI" - Отвечает за подключение к базе данных по url-ссылке.
    Пример: mongodb://localhost:27017/posts
    - "SECRET_TOKEN" - Набор случайных символов для генерации JWT-токена
5) Скачать все необходимые библиотеки.
Это можно сделать при помощи команды:
```
npm i
```
6) Запустить данную логику, через терминал в корневом файле, при помощи команды:
```
npm run start:dev
```
7) Открыть любой браузер и перейти по следующей ссылке: "http://localhost:3000/api"
Там должна открыться swagger документация.
---
##USER
1) По ссылке "http://localhost:3000/user/create" или же в swagger "/user/create" можно создать пользователя указав следующие данные:
    - "login" - Ваш логин
    - "email" - Ваша электронная почта
    - "password" - ваш пароль
При регистрации первый зарегестрированный USER будет иметь роль "admin".
Если вы не желаете давать первому зарестрированному пользователю роль администратора, то в файле "src/modules/user/user.service.ts" удалите следующие строчки кода:
    - 18 строка кода: "const role = await this.roleForFirstUser();"
    - 23 строка кода: "role: role,"
И тогда любой зарегестрированный пользователь будет иметь роль "USER".
2) По ссылке "http://localhost:3000/user/login" или же в swagger "/user/login" можно авторизоваться указав следующие данные:
    - email
    - password
После чего вам вернёт ваш логин, почту и JWT-токен (нужно будет скопировать)
3) Есть возможность проверки корректности JWT-токена по ссылке "http://localhost:3000/auth/user" или же в swagger "/auth/user".
Для этого нужно заполнить поле "Value" нажав на значёк замка.
Поле отправить запроз и получить результат.
---
##POST
1) Создать посто может только авторизованный администратор(используйте JWT-токен).
Если вы хотите добавить роль, которая так же имеет возможность создавать роль, то перейдите в файл "src/modules/post/post.controller.ts". И в строке 18 добавте роль.
Пример: "@Roles('admin', 'members')"
Для создания введите следующие данные:
    - title - титул поста
    - description - описание поста
2) Получить все посты может любой гость и авторизованный пользователь по ссылке "http://localhost:3000/post/posts" или же в swagger "/post/posts".
Вы получите все посты с информацией:
    - Титул
    - Описание
    - Кто создал пост
    - Когда создали пост
    -Когда изменили пост