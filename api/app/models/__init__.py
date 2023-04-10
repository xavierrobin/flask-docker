from flask import Blueprint

bp = Blueprint('models', __name__)

from app.models import widgets, widget_data, clients
