from flask import request, jsonify
from app import db
from app.models.widget_data import WidgetData
from app.models.widgets import Widget
from app.models.clients import Client
from flask import current_app as app
from app.errors import errors
from sqlalchemy import desc
from app.routes import api

from flask_restx import Namespace, Resource, fields, reqparse, abort

ns = Namespace('widget_data', description='Widget_data operations')
api.add_namespace(ns)

parser = reqparse.RequestParser()

widget_model = ns.model('Widget', {
    'id': fields.Integer(readonly=True, description='The unique identifier of a widget'),
    'name': fields.String(required=True, description='The name of a widget'),
})

client_model = ns.model('Client', {
    'id': fields.Integer(readonly=True, description='The unique identifier of a client'),
    'name': fields.String(required=True, description='The name of a client'),
    'bdr_id': fields.String(required=False, description='The BDR ID of a client')
})

widget_data_model = ns.model('WidgetData', {
    'id': fields.Integer(required=True, description='The widget data identifier'),
    'content': fields.String(required=True, description='The content of the widget data'),
    'timestamp': fields.DateTime(required=False, description='The timestamp of the widget data'),
    'widget': fields.Nested(widget_model, description='The widget associated with the widget_data'),
    'client': fields.Nested(client_model, description='The client associated with the widget_data')
})

@ns.route('')
class WidgetDataList(Resource):
    @api.marshal_with(ns.model('WidgetDataListResponse', {
        'data': fields.List(fields.Nested(widget_data_model)),
        '_meta': fields.Nested(ns.model('Pagination', {
            'total_items': fields.Integer,
            'total_pages': fields.Integer,
            'links': fields.Raw,
        }))
    }))
    def get(self):
        parser.add_argument('widget_id', type=int, help='Widget ID')
        parser.add_argument('client_id', type=int, help='Client ID')
        args = parser.parse_args()
        widget_filter = args.get('widget_id')
        client_filter = args.get('client_id')
        if widget_filter is None:
            abort(400, message='Missing required query parameter: widget_id')
        if client_filter is None:
            abort(400, message='Missing required query parameter: client_id')
        widget = Widget.query.filter_by(id=widget_filter).first()
        client = Client.query.filter_by(id=client_filter).first()
        if not widget:
            abort(404, message='Widget not found') 
        if not client:
            abort(404, message='Client not found') 
        
        query = WidgetData.query.filter_by(widget=widget, client=client).order_by(desc(WidgetData.timestamp))
        page = request.args.get('page', 1, type=int)
        per_page = min(request.args.get('per_page', app.config["ITEMS_PER_PAGE"], type=int), 100)
        # data = query.order_by(desc(WidgetData.timestamp)).paginate(page, per_page)
        # return data
        pagination = query.order_by(desc(WidgetData.timestamp)).paginate(page, per_page)

        data = pagination.items
        total_items = pagination.total
        total_pages = pagination.pages
        links = {}
        if pagination.has_prev:
            links['prev'] = api.url_for(WidgetDataList, page=page-1, _external=True)
        if pagination.has_next:
            links['next'] = api.url_for(WidgetDataList, page=page+1, _external=True)

        metadata = {
            'total_items': total_items,
            'total_pages': total_pages,
            'links': links
        }
        response_data = {'data': data, '_meta': metadata}
        return response_data

@ns.route('/<int:id>')
class WidgetDataById(Resource):
    @api.marshal_list_with(widget_data_model, envelope='data')
    def get(self, id):
        return WidgetData.query.get_or_404(id)


@ns.route('')
class WidgetDataPost(Resource):
    @api.marshal_with(widget_data_model, code=201)
    def post(self):
        data = request.json
        widget_id = data.get('widget_id')
        client_id = data.get('client_id')
        widget = Widget.query.get_or_404(widget_id)
        if client_id != None:
            client = Client.query.get_or_404(client_id)
            widget_data = WidgetData(content=data['content'], widget=widget, client=client)
        else:
            widget_data = WidgetData(content=data['content'], widget=widget)
        db.session.add(widget_data)
        db.session.commit()
        return widget_data