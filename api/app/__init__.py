from flask import Flask, request, current_app
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Flask-Admin
    admin = Admin(app, template_mode='bootstrap4')

    from app.models.widgets import Widget
    admin.add_view(ModelView(Widget, db.session))

    from app.models.widget_data import WidgetData
    admin.add_view(ModelView(WidgetData, db.session))

    from app.models.clients import Client
    admin.add_view(ModelView(Client, db.session))

    db.init_app(app)
    migrate.init_app(app, db)

    # Blueprints    
    from app.errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    from app.models import bp as models_bp
    app.register_blueprint(models_bp)

    from app.routes import bp as routes_bp
    app.register_blueprint(routes_bp)

    return app
