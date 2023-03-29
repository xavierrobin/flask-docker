from datetime import datetime
from app import db
from flask import url_for
from app.models.paginate import PaginatedAPIMixin

class Post(PaginatedAPIMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Post {}>'.format(self.body)

    def to_dict(self):
        data = {
            'id': self.id,
            'body': self.body,
            'timestamp': self.timestamp,
            'user_id': self.user_id
        }
        return data