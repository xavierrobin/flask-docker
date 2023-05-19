from flask_restx import Namespace, Resource, fields
from app.routes import api
from app.models.clients import Client
from flask import request

ns = Namespace('clients', description='Clients operations')
api.add_namespace(ns)

client_model = ns.model('Client', {
    'id': fields.Integer(readonly=True, description='The unique identifier of a client'),
    'name': fields.String(required=True, description='The name of a client'),
    'bdr_id': fields.String(required=False, description='The BDR ID of a client'),
    'pods': fields.String(required=False, description='The client\'s pods')
})

@ns.route('')
class Clients(Resource):
    @api.marshal_with(client_model, envelope='data')
    def get(self):
        name_filter = request.args.get('name', default='', type=str)
        clients = Client.query.filter(Client.name.ilike(f'%{name_filter}%')).all()
        return clients

@ns.route('/<int:id>')
class ClientById(Resource):
    @api.marshal_with(client_model, envelope='data')
    def get(self, id):
        return Client.query.get_or_404(id)
