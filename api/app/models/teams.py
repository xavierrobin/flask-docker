from app import db

class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'))
    sponsor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    deputy_sponsor_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    nextgen_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    banker_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    def __repr__(self):
        return '<Team {}>'.format(self.client_id)
