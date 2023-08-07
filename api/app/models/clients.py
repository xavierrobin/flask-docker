from app import db

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    bdr_id = db.Column(db.String(255))
    widget_data_list = db.relationship('WidgetData', backref='client', lazy=True)
    access_rights_clients = db.relationship('AccessRightsClient', backref='client', lazy=True, cascade="all, delete-orphan")
    pods = db.Column(db.String(255))
    team = db.relationship('Team', backref='client', uselist=False, cascade="all, delete-orphan")
    opportunities = db.relationship('Opportunity', backref='client', lazy=True)
    client_impact = db.Column(db.Boolean)

    def __repr__(self):
        return '<Client {}>'.format(self.name)

    def to_dict(self):
        data = {
            'id': self.id,
            'name': self.name,
            'bdr_id': self.bdr_id,
            'pods': self.pods
        }
        return data

    def from_dict(self, data):
        for field in ['name', 'bdr_id', 'pods']:
            if field in data:
                setattr(self, field, data[field])

    def get_accessible_clients(user):
        if user.role.has('ROLE_ADMIN'):
            return []

        access_right = user.access_right
        accessible_clients = [arc.client for arc in access_right.access_rights_clients]
        return accessible_clients