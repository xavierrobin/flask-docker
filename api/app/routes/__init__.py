from flask import Blueprint
from flask_cors import CORS
from flask_restx import Api

bp = Blueprint('routes', __name__)
CORS(bp)
api = Api(bp,
          title='My API',
          version='1.0',
          description='A description of my API')

from .clients import api
from .widgets import api
from .widget_data import api
from .teams import api