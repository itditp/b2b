# Task:
```
Необходимые технологии Django с class based views, jquery и ajax, дабы происходила запись и выборка в бд Структура сайта: Главная, контакты, товары
На главной: Любой текст + три картинки (left, right, center)
Контакты: Карта + форма обратной связи, отправляет письмо клиенту, если тот указывает почту и менеджеру borodaa(собака)gmail.com как тестовый адрес
Товары: Три товара, любые три картинки на каждый товар, любой текст + три параметра из админки. 
```

# DEMO: http://chyngachanga.pythonanywhere.com/
```
http://chyngachanga.pythonanywhere.com/admin
user:misha123
password:mish123
```
# Install:
    ```sh
    $ git clone https://github.com/itditp/b2b-test.git
    $ cd b2b-test/
    $ virtualenv --python=python3.4 env
    $ source env/bin/activate
    $ pip install -r requirements.txt
    $ cd b2b/
    $ python manage.py migrate
    $ python manage.py createsuperuser
    $ python manage.py runserver

```
