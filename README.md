# Cloud-Computing-WS24-25

This project will implement the tasks of the course "Cloud Computing (WiSe 2024)" from Mr. Cocos at the Frankfurt Univ. of Appl. Sciences.

Sure, here's a formatted version for your repository README:

# Frontend Setup Instructions

To get the frontend up and running, follow these steps:

## Prerequisites

Ensure all prerequisites are installed by following the instructions on the Angular Installation (https://angular.dev/installation) Guide.

## Setup

1. Navigate to the `Frontend` folder:
   ```sh
   cd Frontend
   ```

2. Open a terminal in this directory.

3. Start the Angular project:
   ```sh
   npm start
   ```

4. Open the website in your browser:
   ```
   http://localhost:4200/
   ```

You're all set! The frontend should now be running.

Further information coming!

# Backend Setup Instruction

1. Create a venv in the Folder **Backend**

   ```sh
   python -m venv venv
   ```

2. Activate **venv**

   Dependin on the os you use either use:

   ```sh
   .\venv\Scripts\activate 
   ```

   or

   ```sh
   .\venv\Scripts\activate.bat 
   ```

   or

   ```sh
   source venv/bin/activate
   ```

3. Install Packages

   Go to the */Backend* folder and execute:

   ```sh
   pip install -r requirements.txt
   ```

4. Start Webserver

   Go into the folder **webserver** (in your console having the venv activated)
   ```sh
   python manage.py runserver
   ```
