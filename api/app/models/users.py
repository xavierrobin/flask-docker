from app import db
from flask import url_for
from app.models.access_rights import AccessRight

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), index=True, unique=True)
    roles = db.Column(db.String(255), index=True)
    access_right = db.relationship('AccessRight', backref='user', uselist=False, cascade="all, delete-orphan")
    sponsor = db.relationship('Team', backref='user_sponsor', foreign_keys='Team.sponsor_id')
    deputy_sponsor = db.relationship('Team', backref='user_deputy_sponsor', foreign_keys='Team.deputy_sponsor_id')
    banker = db.relationship('Team', backref='user_banker', foreign_keys='Team.banker_id')
    nextgen = db.relationship('Team', backref='user_nextgen', foreign_keys='Team.nextgen_id')

    def __repr__(self):
        return '<User {}>'.format(self.email)

# automatically add an "AccessRight" entry for each new user
@db.event.listens_for(User, "after_insert")
def create_access_right(mapper, connection, target):
    ar = AccessRight.__table__
    connection.execute(ar.insert().values(user_id=target.id))