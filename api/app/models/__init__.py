from flask import Blueprint

bp = Blueprint('models', __name__)

from app.models import widgets, widget_data, clients, users, access_rights, access_rights_clients, teams, opportunities