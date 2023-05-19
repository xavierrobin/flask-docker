from app import db

class AccessRightsClient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    access_right_id = db.Column(db.Integer, db.ForeignKey('access_right.id'))
    canEdit = db.Column(db.Boolean, nullable=True)