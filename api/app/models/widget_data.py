from app import db
from flask import url_for
from datetime import datetime
from app.models.paginate import PaginatedAPIMixin

class WidgetData(PaginatedAPIMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    widget_id = db.Column(db.Integer, db.ForeignKey('widget.id'))

    def __repr__(self):
        return '<WidgetData {}>'.format(self.id)

    def to_dict(self):
        data = {
            'id': self.id,
            'content': self.content,
            'timestamp': self.timestamp,
            'widget_id': self.widget_id,
        }
        return data

    def from_dict(self, data):
        for field in ['content', 'widget_id']:
            if field in data:
                setattr(self, field, data[field])