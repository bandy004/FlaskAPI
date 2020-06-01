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
        title:"Manage tasks",
        dialogTask: false,
        dialogTaskSkill:false,
        tasks: [],
        editTaskIndex: -1,
        taskHeader: [],
        taskSkillHeader:[],
        skills:[],
        skillsToShow:[],
        defaultTask: {},
        selectedTask: {},
        clickedTask:{},
        skillsToAdd:[],
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
        dialogTaskSkill(val){
            val || this.closeTaskSkill();
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
        loadTaskParam() {
            console.log("Called");
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
                    self.defaultTask = Object.assign({},response.data);
                    self.selectedTask = Object.assign({},response.data);
                    self.clickedTask = Object.assign({},response.data);
                    //console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                });
            axios.get(skillHeaderUrl).
                then(function (response) {
                    //console.log("DD", response.data)
                    self.taskSkillHeader = response.data;
                }).catch(function (error) {
                    console.log(error);
                });
            axios.get(skillUrl).
                then(function (response) {
                    self.skills = response.data;
                }).catch(function (error) {
                    console.log(error);
                });
        },
        loadTasks() {
            console.log("Called...load task");
            let self = this;
            axios.get(taskUrl).
                then(function (response) {
                    self.tasks = response.data;
                    console.log(self.tasks);
                }).catch(function (error) {
                    console.log(error);
                });
            //console.log(this.message)
        },

        addTask() {
            let self = this;
            axios.get(addTaskUrl, { params: JSON.stringify(self.selectedTask)})
                .then((response) => {
                    self.loadTasks();
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        closeTask() {
            this.dialogTask = false;
            this.selectedTask = Object.assign({}, this.defaultTask);
            this.editTaskIndex = -1;
            // this.$nextTick(() => {
            //     this.selectedTask = Object.assign({}, this.defaultTask);
            //     this.editTaskIndex = -1;
            // })
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

        selectTask(item) {
          console.log("Selected", item);
          this.clickedTask = JSON.parse(JSON.stringify(item));
          console.log("Selected2", this.clickedTask);
          let s = _.difference(this.skills, this.clickedTask.taskSkills)
          console.log(s);
          this.skillsToShow = JSON.parse(JSON.stringify(s));
        },

        addTaskSkill(){
          let paramToSend = {
            'id': this.clickedTask.id,
            'taskSkills':[],
          }
          for( s of this.skillsToAdd) {
            for (x of this.skillsToShow) {
              //console.log(x, x['name'], x.name)
              if( x.name == s) {
                paramToSend.taskSkills.push(x);
              }
            }
          }
          let self = this
          axios.get(addTaskSkillUrl, { params: JSON.stringify(paramToSend)})
              .then((response) => {
                self.tasks = response.data;
                console.log(self.tasks);
              })
              .catch((error) => {
                  console.log(error);
              });

          console.log(paramToSend);

          this.closeTaskSkill();
        },

        closeTaskSkill() {
            this.dialogTaskSkill = false;

            // this.$nextTick(() => {
            //     this.clickedTask = Object.assign({}, this.defaultTask);
            // })
        },
    }
})
