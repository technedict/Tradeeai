import os
from os import path
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
dbroute = path.dirname(path.realpath(__file__))
load_dotenv(os.path.join(basedir, '.env'))


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + path.join(dbroute, "database.db")
        #'sqlite:///' + os.path.join(basedir, 'app.db')
    MAIL_SERVER = os.environ.get('MAIL_SERVER')
    MAIL_PORT = int(os.environ.get('MAIL_PORT') or 25)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS') is not None
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    ADMINS = ['johnnkono55@gmail.com','jnkono29@gmail.com', 'admin@admin.com']
    LANGUAGES = ['en', 'es']
    MS_TRANSLATOR_KEY = os.environ.get('MS_TRANSLATOR_KEY')
    SCHEDULER_AUTOSTART = True

    OAUTH2_PROVIDERS = {
    # Google OAuth 2.0 documentation:
    # https://developers.google.com/identity/protocols/oauth2/web-server#httprest
    'google': {
        'client_id': os.environ.get('GOOGLE_CLIENT_ID'),
        'client_secret': os.environ.get('GOOGLE_CLIENT_SECRET'),
        'authorize_url': 'https://accounts.google.com/o/oauth2/auth',
        'token_url': 'https://accounts.google.com/o/oauth2/token',
        'userinfo': {
            'url': 'https://www.googleapis.com/oauth2/v3/userinfo',
            'email': lambda json: json['email'],
        },
        'scopes': ['https://www.googleapis.com/auth/userinfo.email'],
        },

    'facebook': {
        'client_id': os.environ.get('FACEBOOK_CLIENT_ID'),
        'client_secret': os.environ.get('FACEBOOK_CLIENT_SECRET'),
        'authorize_url': 'https://www.facebook.com/v18.0/dialog/oauth',
        'token_url': 'https://graph.facebook.com/v18.0/oauth/access_token',
        'userinfo': {
            'url': 'https://graph.facebook.com/v18.0/me?fields=email',
            'email': lambda json: json['email'],
        },
        'scopes': ['https://www.facebook.com/v3.3/user_email'],
        },
    }
