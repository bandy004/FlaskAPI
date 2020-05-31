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
        title: "Manage processors",
        dialogUser: false,
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
        drawer: null,
    },
    mounted() {
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
    }
})
