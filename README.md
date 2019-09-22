## Django Angular StarterKit
This is base kit for the projects base on Angular as a frontend and Django as a backend.

## Setup
1. Install virtulenv (https://pypi.python.org/pypi/virtualenv)
2. Clone the project
git clone git@github.com:kurund/django-angular-starterkit.git
3. cd django-angular-starterkit
3. Create and activate virtualenv
   > virtualenv -p python3 env <br/>
   > source env/bin/activate
4. Install required packages
   > pip install -r backend/requirements.txt
5. Settings
   > cd backend <br/>
   copy settings.py.txt to settings.py and update the db credentials <br/>
   Note: I am using SQLLite for this starterkit
6. Setup database
   > python manage.py migrate
7. Run the server
   > python manage.py runserver
8. Check if application is running correctly
   > http://127.0.0.1:8000/
9. Create superuser for the admin backend
   > python manage.py createsuperuser
10. Login as superuser
   > http://127.0.0.1:8000/admin/
   
## Structure
Django application
> backend folder

Angular application
> frontend folder

## How to use
