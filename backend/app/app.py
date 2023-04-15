from flask import Flask
# Import routes
from index_bp import IndexBp


# Create application
app = Flask(__name__)
# Register routes
app.register_blueprint(IndexBp().get_bp(), url_prefix='/')

# If you are running the application using python3 app.py
if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0', debug=True)


