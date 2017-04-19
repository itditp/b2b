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
