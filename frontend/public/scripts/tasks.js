var taskUrl = "http://localhost:5000/gettasks"
var taskHeaderUrl = "http://localhost:5000/gettaskheader"
var taskEmptyUrl ="http://localhost:5000/getemptytask"
var userUrl = "http://localhost:5000/getusers"
var userHeaderUrl = "http://localhost:5000/getuserheader"
var skillUrl = "http://localhost:5000/gettasks"
var taskHeaderUrl = "http://localhost:5000/gettaskheader"
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
        title:"Manage tasks",
        dialogTask: false,
        tasks: [],
        editTaskIndex: -1,
        taskHeader: [],
        defaultTask: {},
        selectedTask: {},
        drawer: null,
    },
    mounted() {
        this.loadTaskParam();
        this.loadTasks();
        console.log("Done initializing: tasks");
    },
    computed: {
        formTitleTask() {
            return this.editTaskIndex === -1 ? 'New Task' : 'Edit Task';
        },
    },

    watch: {
        dialogTask(val) {
            val || this.closeTask();
        },
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
        loadTaskParam(){
          axios.get(taskHeaderUrl).
              then(function (response) {
                  self.taskHeader = response.data;
              }).catch(function (error) {
                  console.log(error);
              });
          axios.get(taskEmptyUrl).
              then(function (response) {
                  self.defaultTask = response.data;
                  self.selectedTask = response.data;
              }).catch(function (error) {
                  console.log(error);
              });
        }
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
    }
})
