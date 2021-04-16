<template>
    <div>
        <div class="p-2 w-full m-auto" v-if="survey">
            <tsi-person size="lg" class="md:mx-10 lg:mx-48" v-if="status==='person'" :title="survey.project" @person="register"/>
            <div class="md:mx-20 lg:mx-48" v-if="status==='intro'" v-html="survey.description"></div>
            <div v-if="status==='intro'" class="w-full text-center mt-4">
                <button class="bg-lime-700 rounded text-2xl m-auto" @click="status='survey'">Procedi</button>
            </div>
            <tsi-survey-module v-if="status==='survey'"/>
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
        register(person){
            this.$loading ( true )
            this.$api.service ( 'persons' ).create ( person ).then ( res => {
                this.$store.dispatch ( 'dataset' , { table: 'person' , data: person } )
                this.status = 'intro'
                this.$loading()
            }).catch ( err => {
                this.$loading()
                this.$msg ( 'Spiacenti la registrazione non ha avuto successo. Contattare l\'assistenza.' )
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