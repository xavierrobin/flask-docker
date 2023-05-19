from app import db

class Opportunity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product = db.Column(db.String(255))
    sme = db.Column(db.String(255))
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'))
    widget_data_list = db.relationship('WidgetData', backref='opportunity', lazy=True)

    def __repr__(self):
        return '<Opportunity {} {}>'.format(self.client.name, self.product)