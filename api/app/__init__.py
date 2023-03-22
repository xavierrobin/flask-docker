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

    class UserModelView(ModelView):
        page_size = 10  # the number of entries to display on the list view
    from app.models.users import User
    admin.add_view(UserModelView(User, db.session))

    from app.models.posts import Post
    admin.add_view(ModelView(Post, db.session))


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
