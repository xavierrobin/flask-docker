from app import db
from flask import url_for
from datetime import datetime
from app.models.paginate import PaginatedAPIMixin

class WidgetData(PaginatedAPIMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    important = db.Column(db.Boolean, nullable=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    widget_id = db.Column(db.Integer, db.ForeignKey('widget.id'))
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'))
    opportunity_id = db.Column(db.Integer, db.ForeignKey('opportunity.id'))
    pods = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return '<WidgetData {}>'.format(self.id)

    def to_dict(self):
        data = {
            'id': self.id,
            'content': self.content,
            'timestamp': self.timestamp,
            'widget_id': self.widget_id,
            'client_id': self.client_id,
        }
        return data

    def from_dict(self, data):
        for field in ['content', 'widget_id', 'client_id']:
            if field in data:
                setattr(self, field, data[field])
