from flask_restx import Namespace, Resource, fields
from app.routes import api
from app.models.opportunities import Opportunity
from flask import request

ns = Namespace('opportunities', description='Opportunities operations')
api.add_namespace(ns)

client_model = ns.model('Client', {
    'id': fields.Integer(readonly=True, description='The unique identifier of a client'),
    'name': fields.String(required=True, description='The name of a client'),
    'bdr_id': fields.String(required=False, description='The BDR ID of a client')
})

opportunity_model = ns.model('Opportunity', {
    'id': fields.Integer(readonly=True, description='The unique identifier of an opportunity'),
    'product': fields.String(required=True, description='Product related to the opportunity'),
    'sme': fields.String(required=True, description='SME related to the opportunity'),
    'client': fields.Nested(client_model, description='The client associated with the opportunity')
})

@ns.route('')
class Opportunities(Resource):
    @api.marshal_with(opportunity_model, envelope='data')
    def get(self):
        opportunities = Opportunity.query.all()
        return opportunities

@ns.route('/client/<int:id>')
class OpportunityByClientId(Resource):
    @api.marshal_with(opportunity_model, envelope='data')
    def get(self, id):
        opportunities = Opportunity.query.filter_by(client_id=id).all()
        # ajouter le cas où il n'y a pas d'Opportunity
        return opportunities

@ns.route('/<int:id>')
class OpportunityById(Resource):
    @api.marshal_with(opportunity_model, envelope='data')
    def get(self, id):
        return Opportunity.query.get_or_404(id)
