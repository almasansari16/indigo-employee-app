## README.md

This repository contains the code for the following blog post: [How to Create a Simple Flask App](https://www.example.com/blog/how-to-create-a-simple-flask-app).

### Installation

To install the dependencies for this project, run the following command:

```
pip install -r requirements.txt
```

### Running the App

To run the app, run the following command:

```
python app.py
```

The app will be running on port 5000. You can access it in your browser by visiting the following URL:

```
http://localhost:5000/
```

### Code Explanation

The app is a simple Flask app that consists of two files: `app.py` and `templates/index.html`.

`app.py` is the main file of the app. It imports the Flask framework and defines the routes for the app. The `/` route renders the `index.html` template.

`templates/index.html` is the template for the app's homepage. It contains a simple form that allows users to enter their name. When the user submits the form, the data is sent to the `/` route, which renders the `index.html` template again with the user's name in the greeting.

### Conclusion

This is a simple example of how to create a Flask app. For more information on Flask, please refer to the [Flask documentation](https://flask.palletsprojects.com/en/2.1.x/).