<template>
<div>
    <div class="p-4 m-auto md:w-48" v-if="!survey">
        <h4>Codice Accesso</h4>
        <input type="text" class="w-full text-3xl h-12" v-model="survey_key" style="font-size:2rem"/><button @click="start">Procedi</button>
        
    </div>
    <v-survey v-if="survey"/>
    <moka-loading v-if="$mapState().moka.loading"/>
</div>
</template>

<script>
import VSurvey from './survey'
export default {
    name: 'TSISurveyAccess',
    components: { VSurvey },
    data:()=>({
        survey_key: 'a763va',
        survey: false
    }),
    methods: {
        start(){
            if ( !this.survey_key ) return
            this.$loading ( true )
            this.$api.service ( 'surveys_keys' ).find ( {
                query : {
                    key: this.survey_key
                }
            }).then ( res => {
                this.$store.dispatch ( 'dataset' , { table: 'survey' , data : res } )
                this.survey = true
                this.$loading ()
            }).catch ( err => {
                this.$loading()
                this.$message ( 'Codice errato !')
            })
        }
    }
}
</script>