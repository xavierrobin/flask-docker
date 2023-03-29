from flask import jsonify
from flask import request
from flask import url_for
from app import db
from app.routes import bp
from app.models.posts import Post
from flask import current_app as app

@bp.route('/posts', methods=['GET'])
def get_posts():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', app.config["USERS_PER_PAGE"], type=int), 100)
    data = Post.to_collection_dict(Post.query, page, per_page, 'routes.get_posts')
    return jsonify(data)