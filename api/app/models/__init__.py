from flask import Blueprint

bp = Blueprint('models', __name__)

from app.models import users, posts, widgets, widget_data
