
from flask import Flask, request, jsonify


class TaskApp():

    users = []
    tasks = []
    assignments = []

    def __init__(self,name):
        self.app = Flask(name)

        @self.app.route("/")
        def display():
            print(request.method, request.args)
            return  "Hello World"

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



