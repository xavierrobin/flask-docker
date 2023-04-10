from flask_restx import Namespace, Resource, fields
from app.routes import api
from app.models.clients import Client

ns = Namespace('clients', description='Clients operations')
api.add_namespace(ns)

client_model = ns.model('Client', {
    'id': fields.Integer(readonly=True, description='The unique identifier of a client'),
    'name': fields.String(required=True, description='The name of a client'),
    'bdr_id': fields.String(required=False, description='The BDR ID of a client')
})

@ns.route('/')
class Clients(Resource):
    @api.marshal_with(client_model, envelope='data')
    def get(self):
        clients = Client.query.all()
        return clients

