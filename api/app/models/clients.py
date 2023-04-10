from app import db
from flask import url_for

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    bdr_id = db.Column(db.String(255))

    def __repr__(self):
        return '<Client {}>'.format(self.name)

    def to_dict(self):
        data = {
            'id': self.id,
            'name': self.name,
            'bdr_id': self.bdr_id
        }
        return data

    def from_dict(self, data):
        for field in ['name', 'bdr_id']:
            if field in data:
                setattr(self, field, data[field])