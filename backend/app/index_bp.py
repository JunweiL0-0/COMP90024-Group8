from flask import Blueprint
from index_controller import IndexController


class IndexBp:
    index_controller, index_bp = IndexController(), Blueprint('testing_bp', __name__)
    index_bp.route('/', methods=['GET'])(index_controller.get_hello_world)

    def get_bp(self):
        return self.index_bp
