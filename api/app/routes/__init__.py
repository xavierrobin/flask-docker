from flask import Blueprint
from flask_cors import CORS

bp = Blueprint('routes', __name__)
CORS(bp)

from app.routes import users
from app.routes import posts
from app.routes import widgets
from app.routes import widget_data