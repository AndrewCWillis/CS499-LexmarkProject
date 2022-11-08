# CS499-LexmarkProject
Senior Design Project. Lexmark Gallup BP10 Team Builder Web Application.

# Files
React Frontend: `team_builder_react`

Django Backend: `team_builder_django`

# Starting Django
Before the Django server is started, a Python virtual environment must be created using `python -m venv py_venv`. Once created activate the virtual environment using `py_venv\Scripts\activate` (Windows). ~~To exit python virtual environment `deactivate`~~

    python -m venv py_venv
    py_venv\Scripts\activate

Once the virtual environment is running, install the python dependencies located in the `py_requirements.txt` file. Once the requirements are installed the Django backend can be run.

    pip install -r py_requirements.txt


### Run the Django Server
Open a terminal in the team_builder_django directory (manage.py should be in the root), and execute this command;

    python manage.py runserver
    
This will run the Django server on the default settings of `127.0.0.0:0000`. This can be changed by appending parameters to the end of the command:
    
    python manage.py runserver 8080
    python manage.py runserver 0.0.0.0:8000

# Starting React
Open a new terminal in the team_builder_react directory and call the following command

    npm start

If you receive an error `'react-scripts' is not recognized as an internal or external command`, you can fix this via
    
    npm install react-scripts --save
    
# Colaboration
### Adding Python Libraries & Dependencies

Make sure the `py_venv` is activated, then use `python -m pip install <dependency_name>` to install your library. Finally update the `py_requirements` file, using `python -m pip freeze > py_requirements.txt`
