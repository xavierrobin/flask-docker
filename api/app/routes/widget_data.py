from flask import jsonify
from flask import request
from flask import url_for
from app import db
from app.routes import bp
from app.models.widget_data import WidgetData
from flask import current_app as app
from flask_cors import cross_origin

@bp.route('/widget_data', methods=['GET'])
def get_widget_data():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', app.config["USERS_PER_PAGE"], type=int), 100)
    data = WidgetData.to_collection_dict(WidgetData.query, page, per_page, 'routes.get_widget_data')
    return jsonify(data)

@bp.route('/widget_data/<int:id>', methods=['GET'])
def get_widget_data_single(id):
    return jsonify(WidgetData.query.get_or_404(id).to_dict())

@bp.route('/widget_data', methods=['POST'])
def create_widget_data():
    data = request.get_json() or {}
    if 'content' not in data or 'widget_id' not in data:
        return bad_request('must include content and widget_id fields')
    widget_data = WidgetData()
    widget_data.from_dict(data)
    db.session.add(widget_data)
    db.session.commit()
    response = jsonify(widget_data.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for('routes.get_widget_data_single', id=widget_data.id)
    return response

@bp.route('/test')
def test():
    return jsonify({'message': 'Hello, World!'})