<template>
    <div>
        <div class="p-2 w-full m-auto" v-if="survey">
            <tsi-person size="lg" class="md:mx-10 lg:mx-48" v-if="status==='person'" :title="survey.project" 
            @person="status='intro'"/>
            <div class="md:mx-20 lg:mx-48" v-if="status==='intro'" v-html="survey.description"></div>
            <div v-if="status==='intro'" class="w-full text-center mt-4">
                <button class="bg-lime-700 rounded text-2xl m-auto" @click="status='survey'">Procedi</button>
            </div>
            <tsi-survey-module v-if="status==='survey'" @end="register"/>
            <div v-if="status==='end'">Grazie per aver partecipato al questionario</div>
        </div>
    </div>
</template>

<script>
import TsiPerson from './person'
import TsiSurveyModule from './survey.module'
export default {
    name: 'TSISurvey',
    components: { TsiPerson , TsiSurveyModule },
    data:()=>({
        status: 'person'
    }),
    computed:{
        survey(){
            return this.$mapState().datastore.dataset.survey
        }
    },
    methods:{
        register(){
            this.$loading ( true )
            let person = this.$mapState().datastore.dataset.person
            this.$api.service ( 'persons' ).create ( person ).then ( res => {
                this.$store.dispatch ( 'dataset' , { table: 'person' , data: person } )
                this.status = 'end'
                this.$loading()
                console.log ( res )
            }).catch ( err => {
                this.$loading()
                this.$msg ( 'Spiacenti la registrazione del questionario non ha avuto successo. Contattare l\'assistenza.' )
            })
        }
    },
    mounted(){
        let vm = this
        window.addEventListener('beforeunload', 
                                function (e) {
  
            // Check if any of the input
            // fields are filled
            
            vm.$message ( 'Stai lasciando il questionario senza completarlo ')
            e.preventDefault();
            e.returnValue = '';
            
        });
    }
}
</script>