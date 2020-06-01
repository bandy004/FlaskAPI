var skillUrl = "http://localhost:5000/getskills"
var skillHeaderUrl = "http://localhost:5000/getskillheader"
var skillEmptyUrl = "http://localhost:5000/getemptyskill"
var addSkillUrl = "http://localhost:5000/addskill"

var vvue = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    props: {
        source: String,
    },
    data: {
        title: 'Manage skills',
        counter: 0,
        dialogSkill: false,
        skills: [],
        editSkillIndex: -1,
        skillHeader: [],
        defaultSkill: {},
        selectedSkill: {},

        drawer: null,
    },
    mounted() {
        this.loadSkillParam();
        this.loadSkills();
        console.log("Done initializing skills");
    },
    computed: {
        formTitleSkill() {
            return this.editSkillIndex === -1 ? 'New Task' : 'Edit Task';
        },
    },

    watch: {
        dialogSkill(val) {
            val || this.closeSkill();
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
        loadSkillParam() {
            console.log("Called");
            let self = this;
            axios.get(skillHeaderUrl).
                then(function (response) {
                    //console.log("DD", response.data)
                    self.skillHeader = response.data;
                }).catch(function (error) {
                    console.log(error);
                });
            axios.get(skillEmptyUrl).
                then(function (response) {
                    self.defaultSkill = response.data;
                    self.selectedSkill = response.data;
                }).catch(function (error) {
                    console.log(error);
                });
        },
        loadSkills() {
            let self = this;
            axios.get(skillUrl).
                then(function (response) {
                    self.skills = response.data;
                }).catch(function (error) {
                    console.log(error);
                });
            //console.log(this.message)
        },
        addSkill() {
            let self = this;
            axios.get(addSkillUrl, { params: self.selectedSkill })
                .then((response) => {
                    self.loadSkills();
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        closeSkill() {
            this.dialogSkill = false;
            this.$nextTick(() => {
                this.selectedSkill = Object.assign({}, this.defaultSkill);
                this.editSkillIndex = -1;
            })
        },

        editSkill(skill) {
            this.editSkillIndex = this.skills.indexOf(skill);
            this.selectedSkill = Object.assign({}, skill);
            this.dialogSkill = true;

        },

        saveSkill() {
            if (this.editSkillIndex > -1) {
                Object.assign(this.skills[this.editSkillIndex], this.selectedSkill);
            }
            else {
                this.addSkill();
            }
            this.closeSkill();
        },
    }
})
