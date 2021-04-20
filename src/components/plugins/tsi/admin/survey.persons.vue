<template>
    <div v-if="persons" class="text-sm border shadow">
        <div class="w-full bg-gray-500 text-white p-1">{{ $attrs.filter.project }}</div>
        <div class="p-2 pb-1 bg-gray-200 w-full grid grid-cols-7">
            <template v-for="field in fields">
                <div v-if="schema[field].list" class="font-bold capitalize">
                    {{ field }}
                </div>
                
            </template>
        </div>
            <template v-for="person in persons">
                <div class="text-xs p-2 pb-1 border-b w-full hover:bg-gray-100 items-center cursor-pointer grid grid-cols-7">
                    <template v-for="field in fields">
                        <div v-if="field!='_id' && schema[field].list">{{ schema[field].format(person[field]) }}</div>
                    </template>
                    
                    <div class="flex flex-row text-base justify-end items-center">
                        <icon class="border rounded h-8 w-8 text-center hover:bg-blue-300" name="edit" @click="record=survey,edit=!edit" title="Modifica"/>
                        
                        <icon class="border rounded h-8 w-8 text-center hover:bg-blue-300 mx-2" name="quiz" @click="record=person,answers=!answers" title="Risposte"/>
                        <icon class="border rounded h-8 w-8 text-center hover:bg-blue-300 mx-2" name="delete" @click="deletePerson(person._id)" title="Elimina"/>
                    </div> 
                </div>
            </template>
            <moka-modal size="md" position="modal-top-left" v-if="answers" buttons="none" @close="answers=!answers">
                <div slot="title">{{ record.firstname }} {{ record.lastname }}</div>
                <div v-if="record.hasOwnProperty('answers')" slot="content" class="p-2">
                    <section v-if="record.hasOwnProperty('answers')" v-for="answer in Object.keys(record.answers)" class="grid grid-cols-2">
                        <div>{{answer}}</div>
                        <div>{{ record.answers[answer].a }} {{ record.answers[answer].t }}</div>
                    </section>
                </div>
                <div v-else slot="content" class="p-4">
                    Questionario non completato
                </div>
                <!-- <section v-if="record.hasOwnProperty('answers')" v-for="answer in Object.keys(record.answers)" class="grid grid-cols-2">
                    <div>{{answer}}</div>
                    <div>{{ record.answers[answer].a }} {{ record.answers[answer].t }}</div>
                </section>
                <div v-if="!record.hasOwnProperty('answers')">
                </div> -->
            </moka-modal>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'TSISurveyPersons',
    data:()=>({
        persons: null,
        schema: null,
        edit: false,
        answers: false,
        record: null
    }),
    computed:{
        ...mapState ( ['datastore'] ),
        fields(){
            this.schema = this.datastore.dataset.schema.persons
            return Object.keys(this.datastore.dataset.schema.persons)
        },
        cols(){
            let c = 0
            if ( this.fields ){
                this.fields.forEach ( field => {
                    if ( this.datastore.dataset.schema.persons[field].list ){
                        c++
                    }
                })
            }
            return c
        }
    },
    methods: {
        deletePerson(id){
            this.$api.service('persons').remove(id).then ( res => {
                this.$message ( 'Utente rimosso' )
            })
        },
        reloadData(){
            this.$api.service('persons').find ({
                query : {
                    survey_id : this.$attrs.survey || this.$attrs.filter._id
                }
            }).then ( result => {
                this.$store.dispatch ( 'dataset' , { table: 'persons' , data: result.data } )
                this.$store.dispatch ( 'dataset' , { table: 'currentSurvey' , data: this.$attrs.filter } )
                this.persons = result.data
            })
        },
       
    },
    mounted(){
        this.$api.service('persons').on ( 'removed' , data => {
            this.reloadData()
        })
               
            this.$api.service('persons').find ({
                query : {
                    survey_id : this.$attrs.survey || this.$attrs.filter._id
                }
            }).then ( result => {
                this.$store.dispatch ( 'dataset' , { table: 'persons' , data: result.data } )
                this.$store.dispatch ( 'dataset' , { table: 'currentSurvey' , data: this.$attrs.filter } )
                this.persons = result.data
            })
        
    }
}
</script>