from app import db
from flask import url_for
from app.models.widget_data import WidgetData

class Widget(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    widget_data = db.relationship('WidgetData', backref='widget', lazy=True)
    position = db.Column(db.Integer, nullable=True)
    size = db.Column(db.String(64), nullable=True)
    widget_type = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return '<Widget {}>'.format(self.name)

    def to_dict(self):
        latest_data = self.widget_data.order_by(WidgetData.timestamp.desc()).first()
        latest_data_dict = latest_data.to_dict() if latest_data else None
        data = {
            'id': self.id,
            'name': self.name,
            'size': self.size,
            'position': self.position,
            'widget_type': self.widget_type,
            'widget_data': [{'id': wd.id, 'timestamp':wd.timestamp, 'content': wd.content} for wd in self.widget_data],
            'latest_data': latest_data_dict
        }
        return data

    def from_dict(self, data):
        for field in ['name', 'size', 'position', 'widget_type']:
            if field in data:
                setattr(self, field, data[field])
