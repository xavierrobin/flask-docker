from flask_restx import Namespace, Resource, fields
from app.routes import api
from app.models.teams import Team
from flask import request

ns = Namespace('teams', description='Teams operations')
api.add_namespace(ns)

client_model = ns.model('Client', {
    'id': fields.Integer(readonly=True, description='The unique identifier of a client'),
    'name': fields.String(required=True, description='The name of a client'),
    'bdr_id': fields.String(required=False, description='The BDR ID of a client')
})

user_model = ns.model('User', {
    'id': fields.Integer(readonly=True, description='The unique identifier of a user'),
    'email': fields.String(required=True, description='The user\'s email'),
})

team_model = ns.model('Team', {
    'id': fields.Integer(readonly=True, description='The unique identifier of a team'),
    'client': fields.Nested(client_model, description='The client associated with the team'),
    'user_sponsor': fields.Nested(user_model, description='The client\'s sponsor'),
    'user_deputy_sponsor': fields.Nested(user_model, description='The client\'s deputy sponsor'),
    'user_banker': fields.Nested(user_model, description='The client\'s banker'),
    'user_nextgen': fields.Nested(user_model, description='The client\'s nextgen'),
})

@ns.route('')
class Teams(Resource):
    @api.marshal_with(team_model, envelope='data')
    def get(self):
        teams = Team.query.all()
        return teams

@ns.route('/client/<int:id>')
class TeamByClientId(Resource):
    @api.marshal_with(team_model, envelope='data')
    def get(self, id):
        team = Team.query.filter_by(client_id=id).first()
        # ajouter le cas où il n'y a pas de Team
        return team

@ns.route('/<int:id>')
class TeamById(Resource):
    @api.marshal_with(team_model, envelope='data')
    def get(self, id):
        return Team.query.get_or_404(id)
