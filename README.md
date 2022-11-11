# CS499-LexmarkProject
Senior Design Project. Lexmark Gallup BP10 Team Builder Web Application.

# Description
This web application is intended to be a tool for team managers in any sort of organization. The purpose it provide a digital appliance which is capable of generating teams which are cognitively diverse, and are consequently expected to perform better than alternatively formed teams. The cognitive diversity of a team is measured by the cumulative BP10 scores of its consituent members. The website will function by providing the user the ability to store information concerning (presumably) a staff's BP10 data via the "Input" page. This will allow the information to persist, and be accessed subsequently via the "Build" page for evaluation during team generation. 

The files contained in this repository will create the digital environment which allows the website to be hosted locally on your own computer.  

# Prerequisite Software
The website's database was built using the Python programming language. In order to execute the subsequent steps, Python must be installed on the computer. It can be accessed for free from this website https://www.python.org/downloads/ . Do be sure to check the box which sets Python as a system path, which will facilitate the execution of the commands below.

The website's front end using React.js , which depends on Node.js to function. In order to start up the front end of the web application, Node must be installed. This is also available free of cost at this link https://nodejs.org/en/ . 

After these software have been installed on your computer, the website can be run by following the below steps. 

# Files
React Frontend: `team_builder_react`

Django Backend: `team_builder_django`

# Starting Django
This is the website's backend Database, which will allow for employee data to be stored and accessed across many visits to the application. 
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
This is the websites front-end, which contains the web pages you will be interacting with to use this application. The following commands will start up the application and open the page in your default browser. 
Open a new terminal in the team_builder_react directory and call the following command

    npm start

If you receive an error `'react-scripts' is not recognized as an internal or external command`, you can fix this via
    
    npm install react-scripts --save
    
# Colaboration
### Adding Python Libraries & Dependencies

Make sure the `py_venv` is activated, then use `python -m pip install <dependency_name>` to install your library. Finally update the `py_requirements` file, using `python -m pip freeze > py_requirements.txt`
