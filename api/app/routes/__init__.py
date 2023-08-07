from flask import Blueprint
from flask_cors import CORS
from flask_restx import Api

bp = Blueprint('routes', __name__)
CORS(bp)
api = Api(bp,
          title='Client navigator API',
          version='1.0',
          description='All available endpoints to retrieve data related to the Top 100 UK FI clients')

from .clients import api
from .widgets import api
from .widget_data import api
from .teams import api
from .opportunities import api