from dotenv import load_dotenv, find_dotenv
import os
basedir = os.path.abspath(os.path.dirname(__file__))

load_dotenv(find_dotenv())

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    USERS_PER_PAGE = 10
