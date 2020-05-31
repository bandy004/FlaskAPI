
from flask import Flask, request, jsonify, render_template

class TaskApp():

    #skill:{
    #    name: string,
    #    code: string
    #    }
    skillsHeader = [
        { 'text':"Name", 'value':'name', 'align':'start'},
        { 'text':"Code", 'value':'code'},
        { 'text': '', 'value':'actions'},
    ]
    emptySkill ={
        'name' : '',
        'code' :'',
    }
    skills = []


    #user:{
    #    id: string,
    #    name: string,
    #    email: string,
    #    workingHours: real,
    #    hourlyRate: real,
    #    totalAssignedHours: real,
    #    userSkills:[
    #        {skill}
    #        ]
    #    }
    userHeader =[
        {'text':'ID', 'value':'id', 'align':'start'},
        {'text':'Name', 'value':'name'},
        {'text':'Email', 'value':'email'},
        {'text':'Availability', 'value':'workingHours'},
        {'text':'Rate', 'value':'hourlyRate'},
        {'text':'Allocation', 'value':'totalAssignedHours'},
        {'text':'', 'value':'actions'}
    ]
    emptyUser= {
        'id': '',
        'name':'',
        'email':'',
        'workingHours': 0.0,
        'hourlyRate': 0.0,
        'totalAssignedHours': 0.0,
        'userSkills': [],
    }
    users = []


    #task:{
    #    id: string,
    #    name:string,
    #    ownerName: string,
    #    processorName: string,
    #    priority: number
    #    location:string,
    #    date: string,
    #    durationHr: number,
    #    value: real,
    #    duration:{
    #        days: number,
    #        hours: real,
    #        minutes: real}
    #    },
    #    taskSkills:[
    #        {skill}
    #        ]
    taskHeader = [
        { 'text': 'ID', 'value':'id', 'align': 'start'},
        { 'text': 'Name', 'value': 'name' },
        { 'text': 'Date', 'value': 'duedate' },
        { 'text': 'Duration', 'value': 'durationHr' },
        { 'text': 'Owner', 'value': 'ownerName'},
        { 'text': 'Processor', 'value': 'processorName'},
        { 'text': 'Priority', 'value': 'priority'},
        { 'text': 'Value', 'value':'value'},
        { 'text': 'Location', 'value': 'location' },
        { 'text': '', 'value': 'actions' },
    ]

    emptyTask = {
        'id': '',
        'name': '',
        'date': '',
        'durationHr': 0.0,
        'duration':{
            'days': 0,
            'hours': 0,
            'minutes':0,
        },
        'ownerName' : '',
        'processorName': '',
        'priority': 0,
        'value': 0,
        'location':'',
        'taskSkills': [],
    }

    tasks = []


    #assign:{
    #    taskID: string,
    #    taskName: string,
    #    processorID: string,
    #    processorName: string,
    #    value: real,
    #    cost: real,
    #    profit: real
    # }
    assignmentHeader = [
        { 'text': "Task ID", 'value':'taskID', 'align':'start'},
        { 'text': "Task Name", 'value': 'taskName'},
        { 'text': "Processor ID", 'value':'processorID'},
        { 'text': "Prcessor Name", 'value':'processorName'},
        { 'text': "Profit", 'value':'profit'},
        { 'text': '', 'value':'actions'},
    ]
    emptyAssignment = {
        'taskID': '',
        'taskName': '',
        'processorID': '',
        'processorName': '',
        'value': 0,
        'cost': 0,
        'profit': 0,
    }
    assignments = []

    def __init__(self,name):
        self.app = Flask(name, static_url_path='', static_folder='../frontend/public', template_folder='templates')

        @self.app.route("/")
        def show():
           return self.app.send_static_file('index.html')

        @self.app.route("/getusers")
        def getUsers():
            return jsonify(self.users)

        @self.app.route("/getuserheader")
        def getUserHeader():
            return jsonify(self.userHeader)

        @self.app.route("/getemptyuser")
        def getEmptyUser():
            return jsonify(self.emptyUser)

        @self.app.route("/getskills")
        def getSkills():
            return jsonify(self.skills)

        @self.app.route("/getemptyskill")
        def getEmptySkill():
            return jsonify(self.emptySkill)

        @self.app.route("/gettasks")
        def getTasks():
            return jsonify(self.tasks)

        @self.app.route("/gettaskheader")
        def getTaskHeader():
            return jsonify(self.taskHeader)

        @self.app.route("/getemptytask")
        def getEmptyTask():
            return jsonify(self.emptyTask)

        @self.app.route("/getassignments")
        def getAssignments():
            return jsonify(self.assignments)

        @self.app.route("/getemptyassignment")
        def getEmptyAssignment():
            return jsonify(self.emptyAssignment)

        @self.app.route("/addtaskskill")
        def addTaskSkill():
            for t in self.tasks:
                if(t['id'] == request.args['id']):
                    t['taskSkills'].append(request.args['taskSkill'])
                    break
            return getTasks()



        @self.app.route("/adduser")
        def addUser():
            self.users.append(request.args)
            return getUsers()

        @self.app.route("/addskill")
        def addSkill():
            self.skills.append(request.args)
            return getUsers()

        @self.app.route("/addtask")
        def addTask():
            self.tasks.append(request.args)
            return getTasks()

        @self.app.route("/assign")
        def assign():
            a = request.args
            self.assignments.append(a)
            return getAssignments()

        @self.app.route("/adduserskill")
        def addUserSkill():
            for u in self.users:
                if(u['id'] == request.args['id']):
                    u['userSkills'].append(request.args['userSkill'])
                    break
            return getUsers()

        @self.app.route("/reset")
        def reset():
            self.assignments = []
            self.tasks = []
            self.users = []
            return '';

        @self.app.route("/unplan")
        def unplan():
            self.assignments = []
            return '';

    def run(self, id, port, debug):
        self.app.run(host=id, port=port, debug=debug)
