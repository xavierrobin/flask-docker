from flask import request
from app import db
from app.models.widgets import Widget
from app.models.widget_data import WidgetData
from app.routes import api
from flask_restx import Namespace, Resource, fields
from sqlalchemy import desc, and_

ns = Namespace('widgets', description='Widgets operations')
api.add_namespace(ns)

widget_data_model = ns.model('WidgetData', {
    'id': fields.Integer(required=True, description='The widget data identifier'),
    'content': fields.String(required=True, description='The content of the widget data'),
    'timestamp': fields.DateTime(required=True, description='The timestamp of the widget data'),
})

widget_model = ns.model('Widget', {
    'id': fields.Integer(readonly=True, description='The unique identifier of a widget'),
    'name': fields.String(required=True, description='The name of a widget'),
    'widget_data': fields.List(fields.Nested(widget_data_model), description='The widget data associated with the widget'),
})

@ns.route('/<int:id>')
class WidgetById(Resource):
    @api.marshal_with(widget_model, envelope='data')
    def get(self, id):
        return Widget.query.get_or_404(id)

@ns.route('')
class Widgets(Resource):    
    @api.marshal_list_with(widget_model, envelope='data')
    def get(self):
        name_filter = request.args.get('name', default='', type=str)
        widgets = Widget.query.filter(Widget.name.ilike(f'%{name_filter}%')).all()
        for widget in widgets:
            widget.widget_data = [widget.widget_data.order_by(WidgetData.timestamp.desc()).first()]
        return widgets
