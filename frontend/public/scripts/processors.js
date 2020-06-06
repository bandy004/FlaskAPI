var taskUrl = "http://localhost:5000/gettasks"
var taskHeaderUrl = "http://localhost:5000/gettaskheader"
var userEmptyUrl ="http://localhost:5000/getemptyuser"
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

var addUserSkillUrl = "http://localhost:5000/adduserskill"


var vvue = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    props: {
        source: String,
    },
    data: {
        title: "Manage processors",
        dialogUser: false,
        dialogUserSkill: false,
        users: [],
        editUserIndex: -1,
        userHeader: [],
        userSkillHeader: [],
        skills:[],
        skillsToShow:[],
        defaultUser: {},
        selectedUser: {},
        clickedUser:{},
        skillsToAdd:[],
        drawer: null,
    },
    mounted() {
        this.loadUserParam();
        this.loadUsers();
        console.log("Done initializing");
    },
    computed: {
        formTitleUser() {
            return this.editUserIndex === -1 ? 'New User' : 'Edit User';
        },
    },

    watch: {
        dialogUser(val) {
            val || this.closeUser();
        },
        dialogUserSkill(val) {
            val || this.closeUserSkill();
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
        loadUserParam() {
            console.log("Called");
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
                    self.defaultUser = Object.assign({},response.data);
                    self.selectedUser = Object.assign({},response.data);
                    self.clickedUser = Object.assign({},response.data);
                    //console.log(response.data);
                }).catch(function (error) {
                    console.log(error);
                });
            axios.get(skillHeaderUrl).
                then(function (response) {
                    //console.log("DD", response.data)
                    self.userSkillHeader = response.data;
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

        addUser() {
            let self = this;
            axios.get(addUserUrl, { params: JSON.stringify(self.selectedUser) })
                .then((response) => {
                    self.loadUsers();
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        closeUser() {
            this.dialogUser = false;
            this.selectedUser = Object.assign({}, this.defaultUser);
            this.editUserIndex = -1;
            // this.$nextTick(() => {
            //     this.selectedUser = Object.assign({}, this.defaultUser);
            //     this.editUserIndex = -1;
            // })
        },

        editUser(user) {
            this.editUserIndex = this.users.indexOf(user);
            this.selectedUser = Object.assign({}, user);
            this.dialogUser = true;
        },

        saveUser() {
            if (this.editUserIndex > -1) {
                Object.assign(this.users[this.editUserIndex], this.selectedUser);
            }
            else {
                this.addUser();
            }
            this.closeUser();
        },

        selectUser(item){
          this.clickedUser = JSON.parse(JSON.stringify(item));
          console.log("Selected2", this.clickedUser);
          let s = _.difference(this.skills, this.clickedUser.userSkills)
          console.log(s);
          this.skillsToShow = JSON.parse(JSON.stringify(s));
        },

        addUserSkill(){
          let paramToSend = {
            'id': this.clickedUser.id,
            'userSkills':[],
          }
          for( s of this.skillsToAdd) {
            for (x of this.skillsToShow) {
              //console.log(x, x['name'], x.name)
              if( x.name == s) {
                paramToSend.userSkills.push(x);
              }
            }
          }
          let self = this
          axios.get(addUserSkillUrl, { params: JSON.stringify(paramToSend)})
              .then((response) => {
                self.users = response.data;
                console.log(self.users);
              })
              .catch((error) => {
                  console.log(error);
              });

          console.log(paramToSend);

          this.closeUserSkill();
        },

        closeUserSkill() {
            this.dialogUserSkill = false;

            // this.$nextTick(() => {
            //     this.clickedTask = Object.assign({}, this.defaultTask);
            // })
        },
    }
})
