<template>
    <div class="text-sm w-full m-auto border shadow">
        <button @click="createNew()">Crea</button>
        <div :class="'bg-gray-500 text-gray-200 p-2 pb-1 items-center justify-center grid grid-cols-' + (cols+1)">
            <template v-for="field in fields">
                <div v-if="field!='_id' && schema[field].list" class="capitalize">{{ field  }}</div>
            </template>
            <div class=""></div>
        </div>
        <template v-for="survey in datastore.dataset.surveys">
            <div :class="'p-2 pb-1 border-b w-full hover:bg-gray-100 items-center cursor-pointer grid grid-cols-' + (cols+1)">
                <template v-for="field in fields">
                    <div v-if="field!='_id' && schema[field].list">{{ schema[field].format(survey[field]) }}</div>
                </template>
                <div class="flex flex-row text-xl justify-end items-center">
                    <icon class="border rounded h-8 w-8 text-center hover:bg-blue-300" name="edit" @click="record=survey,edit=!edit" title="Modifica"/>
                    <icon class="border rounded h-8 w-8 text-center hover:bg-blue-300 mx-2" name="people" @click="record=survey,tab('persons')" title="Utenti"/>
                    <icon class="border rounded h-8 w-8 text-center hover:bg-blue-300" name="launch" @click="simulator(survey._id)" title="Test"/>
                </div>
            </div>
        </template>

        <transition name="fade">
            <div>
                <moka-modal
                    v-if="edit"
                    size="full"
                    position=""
                    @close="edit=!edit"
                    @click_0="edit=!edit"
                    @click_1="save">
                    <div slot="title">{{ record.project }}</div>
                    <survey-admin slot="content" v-if="edit" v-model="record"/>
                </moka-modal>
                <!-- <moka-modal
                    v-if="persons"
                    size="full"
                    position=""
                    buttons="none"
                    @close="persons=!persons">
                    <div slot="title">{{ record.project }}</div>
                    <survey-persons slot="content" v-if="persons" :survey="record._id"/>
                </moka-modal> -->
            </div>
        </transition>
    </div>
</template>

<script>
//import schema from '@/components/plugins/tsi/admin/schema.js'
import { mapState } from 'vuex'
import SurveyAdmin from './survey.admin'
import SurveyPersons from './survey.persons'

export default {
    name: 'TSISurveysAdmin',
    components: { SurveyAdmin , SurveyPersons },
    data:()=>({
        schema: null,
        fields: null,
        record: null,
        persons: false,
        edit: false
    }),
    watch:{
        
    },
    computed:{
        ...mapState ( [ 'desktop' , 'datastore'] ),
        cols(){
            let c = 0
            if ( this.fields ){
                this.fields.forEach ( field => {
                    if ( this.schema[field].list ){
                        c++
                    }
                })
            }
            return c
        }
    },
    methods:{
        simulator(id){
            let route = this.$router.resolve({ path: "/survey" });
            var w = window.open(route.href, "tsi",'width=' + window.screen.availWidth );
        },
        save(){
            this.record.hasOwnProperty('_id') ?
                this.$api.service('surveys').patch ( this.record._id , this.record ).then ( res=> {
                    this.edit = false
                    this.$message ( 'Dati salvati con successo')
                }) : this.create()

        },
        create(){
            this.record.keycode = this.$randomKey()
            this.$api.service('surveys').create ( this.record ).then ( survey => {
                let _id = survey._id
                //this.datastore.dataset.surveys.push ( survey )
                this.$api.service('surveys_keys').create ( {
                    key: survey.keycode ,
                    survey: _id
                }).then ( survey_key => {
                    this.$api.service('questions').create ( {
                        id: _id ,
                        questions: this.datastore.dataset.questions 
                    }).then ( res => {
                        this.$message ( 'Creato nuovo questionario' )
                    })
                })
            })
        },
        tab(name){
            this.desktop.tabs.push ( {
                component: () => import ( '@/components/plugins/tsi/admin/survey.' + name ) ,
                name: 'Utenti' ,
                icon: 'people',
                filter: this.record,
                ref: this.$randomID(),
                resumeAction: null,
                blocks: null,
            })
            this.desktop.currentTab = this.desktop.tabs.length -1
        },
        createNew(){
            this.record = {}
            console.log ( 'KEY=>' , this.$randomKey() )
            Object.keys(this.schema).map ( field => {
                this.record[field] = this.schema[field].default
            })
            this.record.project = 'Nuovo questioario'
            this.record.date = new Intl.DateTimeFormat('it-IT').format(new Date)
            this.record.answers = this.datastore.dataset.schema.answers

            this.edit = true
        }
    },
    beforeMount(){
        this.fields = Object.keys(this.datastore.dataset.schema.surveys)
        this.schema = this.datastore.dataset.schema.surveys
    }
}
</script>