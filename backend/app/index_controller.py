class IndexController:
    request = None

    def __init__(self, request):
        self.request = request

    def get_hello_world(self):
        # return {'ip': str(self.request.args.get("haha"))}, 200
        return {'message': 'hello world'}, 200
