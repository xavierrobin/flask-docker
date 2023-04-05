from flask import jsonify
from flask import request
from flask import url_for
from app import db
from app.routes import bp
from app.models.widgets import Widget
from flask import current_app as app

@bp.route('/widgets', methods=['GET'])
def get_widgets():
    name_filter = request.args.get('name', default='', type=str)
    widgets = Widget.query.filter(Widget.name.contains(name_filter)).all()
    return jsonify({'items': [w.to_dict() for w in widgets]})


@bp.route('/widgets/<int:id>', methods=['GET'])
def get_widget(id):
    return jsonify(Widget.query.get_or_404(id).to_dict())