from flask import request, jsonify
from app import db
from app.models.widget_data import WidgetData
from app.models.widgets import Widget
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

widget_data_model = ns.model('WidgetData', {
    'id': fields.Integer(required=True, description='The widget data identifier'),
    'content': fields.String(required=True, description='The content of the widget data'),
    'timestamp': fields.DateTime(required=False, description='The timestamp of the widget data'),
    'widget': fields.Nested(widget_model, description='The widget associated with the widget_data'),
    #'widget_id': fields.Integer(widget_model, description='The widget associated with the widget_data'),
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
        args = parser.parse_args()
        widget_filter = args.get('widget_id')
        if widget_filter is None:
            abort(400, message='Missing required query parameter: widget_id')
        widget = Widget.query.filter_by(id=widget_filter).first()
        if not widget:
            abort(404, message='Widget not found') 
        query = WidgetData.query.filter_by(widget=widget).order_by(desc(WidgetData.timestamp))
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
    @api.expect(widget_data_model)
    @api.marshal_with(widget_data_model, code=201)
    def post(self):
        data = request.json
        widget_id = data.get('widget_id')
        widget = Widget.query.get_or_404(widget_id)
        widget_data = WidgetData(content=data['content'], widget=widget)
        db.session.add(widget_data)
        db.session.commit()
        return widget_data