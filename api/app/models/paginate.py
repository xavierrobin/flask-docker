from flask import url_for, request

class PaginatedAPIMixin(object):
    @staticmethod
    def to_collection_dict(query, page, per_page, endpoint, **kwargs):
        resources = query.paginate(page, per_page, False)
        data = {
            'items': [item.to_dict() for item in resources.items],
            '_meta': {
                'page': page,
                'per_page': per_page,
                'total_pages': resources.pages,
                'total_items': resources.total
            },
            '_links': {
                'self': '{}?{}'.format(url_for(endpoint), request.query_string.decode()),
                'next': '{}?{}&page={}&per_page={}'.format(url_for(endpoint), request.query_string.decode(), page+1, per_page) if resources.has_next else None,
                'prev': '{}?{}&page={}&per_page={}'.format(url_for(endpoint), request.query_string.decode(), page-1, per_page) if resources.has_prev else None            }
        }
        return data
