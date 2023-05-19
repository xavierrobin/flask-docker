from app import db

class AccessRight(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    access_rights_clients = db.relationship('AccessRightsClient', backref='access_right', lazy=True, cascade="all, delete-orphan")

    def __repr__(self):
        return '<AccessRight {}>'.format(self.user.email)
