from flask import Flask, request, current_app
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from wtforms import StringField, SelectMultipleField
from wtforms.validators import DataRequired
from flask_wtf import FlaskForm
from flask_admin.form import Select2Field

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Flask-Admin
    ## Use bootstrap template
    admin = Admin(app, template_mode='bootstrap4')

    ## Add User view
    ### Generate a custom form with multiple select for user roles
    class UserForm(FlaskForm):
        email = StringField('Email', validators=[DataRequired()])
        roles = SelectMultipleField('Roles', choices=[('ROLE_READ_ONLY_ALL', 'Read only (all)'), ('ROLE_TRANSVERSAL', 'Transversal'), ('ROLE_SALES', 'Sales'), ('ROLE_POD', 'Pod sponsor'), ('ROLE_BANKER', 'Banker')], validators=[DataRequired()])

    from app.models.users import User
    class UserView(ModelView):
        column_searchable_list = ('id', 'email', 'roles')
        column_filters = ('email', 'roles')
        form = UserForm

        def on_model_change(self, form, model, is_created):
            model.roles = ','.join(form.roles.data)

        def on_form_prefill(self, form, id):
            user = self.get_one(id)
            form.roles.data = user.roles.split(',') if user.roles else []

        def get_template_context(self):
            context = super().get_template_context()
            context['html_content'] = '<p>This is my user view</p>'
            return context

        def get_template_name(self, **kwargs):
            template_name = super().get_template_name(**kwargs)
            print(f'Using template: {template_name}')
            return template_name

    admin.add_view(UserView(User, db.session)) 


    ## Add Client view
    ### Generate a custom form with multiple select for client pods
    class ClientForm(FlaskForm):
        name = StringField('Name', validators=[DataRequired()])
        bdr_id = StringField('BDR ID', validators=[DataRequired()])
        pods = SelectMultipleField('Pods', choices=[('active_fixed_income', 'Active fixed income'), ('active_equity', 'Active equity'), ('emerging_markets', 'Emerging Markets'), ('esg', 'ESG'), ('etf', 'ETF'), ('exec', 'Execution desk / E-com'), ('ldi', 'LDI'), ('multi_assets', 'Multi-assets')], validators=[DataRequired()])

    ### add view
    from app.models.clients import Client
    class ClientView(ModelView):
        form = ClientForm
        column_searchable_list = ('name', 'bdr_id')

        def on_model_change(self, form, model, is_created):
            model.pods = ','.join(form.pods.data)

        def on_form_prefill(self, form, id):
            client = self.get_one(id)
            form.pods.data = client.pods.split(',') if client.pods else []

    admin.add_view(ClientView(Client, db.session))

    from app.models.opportunities import Opportunity
    from app.data.opportunities import products, smes
    # Add empty value as the first option in the choices lists
    products.insert(0, ('', ''))
    smes.insert(0, ('', ''))
    class OpportunitiesView(ModelView):
        column_list = ['id', 'client.name', 'product', 'sme']  # Access the 'name' attribute of the 'client' relationship
        column_searchable_list = ['client.name']  # Enable searching by client name
        form_columns = ('client', 'product', 'sme')  # Only show these fields in the form
        form_extra_fields = {
            'product': Select2Field('Product', choices=products),
            'sme': Select2Field('SME', choices=smes)
        }

    admin.add_view(OpportunitiesView(Opportunity, db.session))

    ## Add AccessRights view
    ### Display name of client instead of id
    from flask_admin.contrib.sqla.ajax import QueryAjaxModelLoader
    def client_query_factory():
        return db.session.query(AccessRightsClient).join(Client).order_by(Client.name)

    ## add view
    from app.models.access_rights import AccessRight
    class AccessRightsView(ModelView):
        column_list = ['id', 'user']
        column_sortable_list = ['id', 'user.email']
        column_searchable_list = ['id', 'user.email']
        form_columns = ['user', 'access_rights_clients']
        form_args = {
            'access_rights_clients': {
                'query_factory': client_query_factory,
                'get_label': lambda item: item.client.name,
                'allow_blank': True
            }
        }

    admin.add_view(AccessRightsView(AccessRight, db.session))

    ## Add AR Clients view
    from app.models.access_rights_clients import AccessRightsClient
    class AccessRightsClientsView(ModelView):
        column_list = ['id', 'client', 'access_right']
        column_sortable_list = ['id', 'client']
        column_searchable_list = ['id', 'client.name']
        form_columns = ['client', 'access_right', 'canEdit']

    admin.add_view(AccessRightsClientsView(AccessRightsClient, db.session))

    ## Add Widget view
    from app.models.widgets import Widget
    from app.data.widgets import size, widget_type
    # Add empty value as the first option in the choices lists
    size.insert(0, ('', ''))
    widget_type.insert(0, ('', ''))
    class WidgetsView(ModelView):
        column_list = ['name', 'widget_type']
        column_sortable_list = ['name', 'widget_type']
        column_searchable_list = ['name', 'widget_type']
        form_columns = ['name', 'position', 'size', 'widget_type']
        form_extra_fields = {
            'size': Select2Field('Size', choices=size),
            'widget_type': Select2Field('Type/page', choices=widget_type)
        }
    admin.add_view(WidgetsView(Widget, db.session))

    ## Add Widget_data view
    from app.models.widget_data import WidgetData
    from app.data.pods import pods
    pods.insert(0, ('', ''))
    class WidgetDataView(ModelView):
        column_searchable_list = ('content', 'timestamp')
        column_filters = ('widget_id', 'client_id')
        form_columns = ('content', 'timestamp', 'widget', 'client', 'opportunity', 'pods')
        form_extra_fields = {
            'pods': Select2Field('Pod', choices=pods),
        }
    admin.add_view(WidgetDataView(WidgetData, db.session))


    ## Add Teams view
    from app.models.teams import Team
    class TeamsView(ModelView):
        column_list = ['id', 'client.name', 'user_sponsor.email', 'user_banker.email']
        column_sortable_list = ['id', 'client.name', 'user_sponsor.email', 'user_banker.email']
        column_searchable_list = ['id', 'client.name', 'user_sponsor.email', 'user_banker.email']
        form_columns = ['client', 'user_sponsor', 'user_deputy_sponsor', 'user_banker', 'user_nextgen']

    admin.add_view(TeamsView(Team, db.session))

    # SQL Alchemy
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
