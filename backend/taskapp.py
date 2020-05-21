
from flask import Flask, request, jsonify


class TaskApp():

    users = []
    tasks = []
    assignments = []

    def __init__(self,name):
        self.app = Flask(name, static_url_path='', static_folder='../frontend')

        @self.app.route("/")
        def show():
           return  self.app.send_static_file('index.html')

        @self.app.route("/adduser")
        def addUser():
            self.users.append(request.args)
            return jsonify(self.users)

        @self.app.route("/addtask")
        def addTask():
            self.users.append(request.args)
            return jsonify(self.tasks)

        @self.app.route("/assign")
        def assign():
            a = request.args
            self.assignments.append(a)
            return jsonify(self.assignments)

        @self.app.route("/reset")
        def reset():
            self.assignments = []
            self.tasks = []
            self.users = []

        @self.app.route("/unplan")
        def unplan():
            self.assignments = []

    def run(self, id, port, debug):
        self.app.run(host=id, port=port, debug=debug)



