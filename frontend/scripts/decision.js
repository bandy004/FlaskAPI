var taskUrl = "http://localhost:5000/gettasks"
var taskHeaderUrl = "http://localhost:5000/gettaskheader"
var taskEmptyUrl ="http://localhost:5000/getemptytask"
var userUrl = "http://localhost:5000/getusers"
var userHeaderUrl = "http://localhost:5000/getuserheader"
var skillUrl = "http://localhost:5000/getskills"
var skillHeaderUrl = "http://localhost:5000/getskillheader"
var taskHeaderUrl = "http://localhost:5000/gettaskheader"
var assignments = "http://localhost:5000/getassignments"
var resetUrl = "http://localhost:5000/reset"

var addTaskUrl = "http://localhost:5000/addtask"
var addUserUrl = "http://localhost:5000/adduser"
var addAssignUrl = "http://localhost:5000/assign"

var addTaskSkillUrl = "http://localhost:5000/addtaskskill"

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
        taskHeader: [],
        clickedTask: {},
        editUserIndex: -1,
        userHeader: [],
        clickedUser: {},
        users: [],
        drawer: null,
    },
    mounted() {
      this.loadTaskParam();
      this.loadTasks();
      this.loadUsers();
      this.loadUserParam();
      console.log("Done initializing");
    },
    computed: {
        formTitleTask() {
            return this.editTaskIndex === -1 ? 'New Task' : 'Allocate Processor';
        },
        formTitleUser() {
            return this.editUserIndex === -1 ? 'New User' : 'Assign Task';
        },
    },

    watch: {
        dialogUser(val) {
            val || this.closeUser();
        },
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
        loadTaskParam() {
            let self = this;
            axios.get(taskHeaderUrl).
                then(function (response) {
                    //console.log("DD", response.data)
                    self.taskHeader = response.data;
                }).catch(function (error) {
                    console.log(error);
                });
            axios.get(taskEmptyUrl).
                then(function (response) {
                    self.clickedTask = Object.assign({},response.data);
                    //console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                });
        },
        loadUserParam() {
            let self = this;
            axios.get(userHeaderUrl).
                then(function (response) {
                    //console.log("DD", response.data)
                    self.userHeader = response.data;
                }).catch(function (error) {
                    console.log(error);
                });
            axios.get(userEmptyUrl).
                then(function (response) {
                    self.clickedUser = Object.assign({},response.data);
                    //console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                });
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
        // loadAssignments() {
        //     let self = this;
        //     axios.get(assignments)
        //         .then(function (response) {
        //             self.assignments = response.data;
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         });
        // },
        // addAssign() {
        //     let self = this;
        //     axios.get(addAssignUrl, { params: self.selectedAssign })
        //         .then((response) => {
        //             self.loadAssignments();
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // },
        //
        // closeAssign() {
        //     this.dialogAssign = false;
        //     this.$nextTick(() => {
        //         this.selectedAssign = Object.assign({}, this.defaultAssign);
        //         this.editAssignmentIndex = -1;
        //     })
        // },

        // editAssign(assign) {
        //     this.editAssignmentIndex = this.assignments.indexOf(assign);
        //     this.selectedAssign = Object.assign({}, assign);
        //     this.dialogAssign = true;
        // },
        //
        // saveAssign() {
        //     if (this.editAssignmentIndex > -1) {
        //         Object.assign(ths.assignments[this.editAssignmentIndex], this.selectedAssign);
        //     }
        //     else {
        //         this.addAssign();
        //     }
        //     this.closeAssign();
        // }
    }
})
