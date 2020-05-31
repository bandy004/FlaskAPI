var taskUrl = "http://localhost:5000/gettasks"
var userUrl = "http://localhost:5000/getusers"
var assignments = "http://localhost:5000/getassignments"
var resetUrl = "http://localhost:5000/reset"

var addTaskUrl = "http://localhost:5000/addtask"
var addUserUrl = "http://localhost:5000/adduser"
var addAssignUrl = "http://localhost:5000/assign"


var vvue = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    props: {
        source: String,
    },
    data: {
        title: 'Manage task assignments',
        counter: 0,
        dialogTask: false,
        dialogUser: false,
        dialogAssign:false,
        tasks: [],
        editTaskIndex: -1,
        taskHeader: [
            { text: 'Name', value: 'name', align: 'start' },
            { text: 'Due Date', value: 'duedate' },
            { text: 'Duration', value: 'duration' },
            { text: 'Location', value: 'location' },
            { text: '', value: 'actions' }
        ],
        defaultTask: {
            duedate: new Date().toISOString().substr(0, 10),
            duration: -1,
            location: '',
            name: ''
        },
        selectedTask: {
            duedate: '',
            duration: -1,
            location: '',
            name: ''
        },
        editUserIndex: -1,
        userHeader: [
            { text: 'Name', value: 'name' },
            { text: 'Email', value: 'email' },
            { text: '', value: 'actions' }
        ],

        defaultUser: {
            name: '',
            email: ''
        },
        selectedUser: {
            name: '',
            email: '',
        },
        users: [],

        editAssignmentIndex: -1,
        assignmentHeader: [
            { text: 'User', value: 'user' },
            { text: 'Task', value: 'task' },
            { text: '', value: 'actions' }
        ],

        assignments: [],
        defaultAssign: {
            user: '',
            task: ''
        },
        selectedAssign: {
            user: '',
            task: '',
        },
        drawer: null,
    },
    mounted() {
        this.loadTasks();
        this.loadUsers();
        this.loadAssignments();
        console.log("Done initializing");
    },
    computed: {
        formTitleTask() {
            return this.editTaskIndex === -1 ? 'New Task' : 'Edit Task';
        },
        formTitleUser() {
            return this.editUserIndex === -1 ? 'New User' : 'Edit Task';
        },
        formTitleAssign() {
            return this.editUserIndex === -1 ? 'New Assignment' : 'Edit Assignment';
        }
    },

    watch: {
        dialogUser(val) {
            val || this.closeUser();
        },
        dialogTask(val) {
            val || this.closeTask();
        },
        dialogAssign(val) {
            val || this.closeAssign();
        }
    },
    methods: {
        reset() {
            let self = this;
            axios.get(resetUrl).then((response) => {
                self.loadTasks();
                self.loadUsers();
            }).catch((error) => {
                console.log(error)
            })
        },
        loadTasks() {
            let self = this;
            axios.get(taskUrl).
                then(function (response) {
                    self.tasks = response.data;
                }).catch(function (error) {
                    console.log(error);
                });
            //console.log(this.message)
        },
        loadUsers() {
            let self = this;
            axios.get(userUrl)
                .then(function (response) {
                    self.users = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        loadAssignments() {
            let self = this;
            axios.get(assignments)
                .then(function (response) {
                    self.assignments = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        addTask() {
            let self = this;
            axios.get(addTaskUrl, { params: self.selectedTask })
                .then((response) => {
                    self.loadTasks();
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        closeTask() {
            this.dialogTask = false;
            this.$nextTick(() => {
                this.selectedTask = Object.assign({}, this.defaultTask);
                this.editTaskIndex = -1;
            })
        },

        editTask(task) {
            this.editTaskIndex = this.tasks.indexOf(task);
            this.selectedTask = Object.assign({}, task);
            this.dialogTask = true;

        },

        saveTask() {
            if (this.editTaskIndex > -1) {
                Object.assign(ths.tasks[editTaskIndex], this.selectedTask);
            }
            else {
                this.addTask();
            }
            this.closeTask();
        },

        addUser() {
            let self = this;
            axios.get(addUserUrl, { params: self.selectedUser })
                .then((response) => {
                    self.loadUsers();
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        closeUser() {
            this.dialogUser = false;
            this.$nextTick(() => {
                this.selectedUser = Object.assign({}, this.defaultUser);
                this.editUserIndex = -1;
            })
        },

        editUser(user) {
            this.editUserIndex = this.users.indexOf(user);
            this.selectedUser = Object.assign({}, user);
            this.dialogUser = true;
        },

        saveUser() {
            if (this.editUserIndex > -1) {
                Object.assign(ths.users[this.editUserIndex], this.selectedUser);
            }
            else {
                this.addUser();
            }
            this.closeUser();
        },

        addAssign() {
            let self = this;
            axios.get(addAssignUrl, { params: self.selectedAssign })
                .then((response) => {
                    self.loadAssignments();
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        closeAssign() {
            this.dialogAssign = false;
            this.$nextTick(() => {
                this.selectedAssign = Object.assign({}, this.defaultAssign);
                this.editAssignmentIndex = -1;
            })
        },

        editAssign(assign) {
            this.editAssignmentIndex = this.assignments.indexOf(assign);
            this.selectedAssign = Object.assign({}, assign);
            this.dialogAssign = true;
        },

        saveAssign() {
            if (this.editAssignmentIndex > -1) {
                Object.assign(ths.assignments[this.editAssignmentIndex], this.selectedAssign);
            }
            else {
                this.addAssign();
            }
            this.closeAssign();
        }
    }
})
