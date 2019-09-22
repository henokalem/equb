## Django Angular StarterKit
This is base kit for the projects base on Angular as a frontend and Django as a backend.

## Setup
1. Install virtulenv (https://pypi.python.org/pypi/virtualenv)
2. Clone the project
git clone git@github.com:kurund/django-angular-starterkit.git
3. cd django-angular-starterkit

### Backend
a. Create and activate virtualenv
   > virtualenv -p python3 env
   > source env/bin/activate

b. Install required packages
   > pip install -r backend/requirements.txt

c. Setup
   > cd backend
   copy settings.py.txt to settings.py and update the db credentials <br/>
   Note: I am using SQLLite for this starterkit

d. Setup database
   > python manage.py migrate

e. Run the server
   > python manage.py runserver

f. Check if application is running correctly
   > http://127.0.0.1:8000/

g. Create superuser for the admin backend
   > python manage.py createsuperuser

h. Login as superuser
   > http://127.0.0.1:8000/admin/

## Setup frontend
a. Install latest version of nodejs: https://nodejs.org/en/
b. Install Angular CLI: https://cli.angular.io/
c. Setup
> cd webapp
> npm install

d. Run the project in development mode
> ng serve <br>


## Structure
Django application
> backend folder

Angular application
> webapp folder

## Deploying the application on production
TBD
