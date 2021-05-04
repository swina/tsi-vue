<template>
    <div>
        <div class="h-10 capitalize p-2 bg-lime-700 text-white rounded-tl rounded-tr">{{ $attrs.title }}</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 rounded p-8 shadow-lg" v-if="fields">
            <div v-for="field in fields" class="flex flex-col blur-lg">
                <label class="font-bold text-gray-400 capitalize">{{ schema[field].label }}</label>
                <input :class="size" v-if="inputType(schema[field])" :type="inputType(schema[field])" v-model="person[field]"/>
                <textarea :class="size" v-if="schema[field].type==='text'" v-model="person[field]"/>
                <select :class="size" v-if="schema[field].type==='selection'" v-model="person[field]">
                    <option v-for="fselection in selections[field]" :value="fselection">{{ fselection }}</option>
                </select> 
            </div>
        </div>
        <div class="w-full text-center mt-4">
            <button v-if="person" class="bg-lime-700 rounded text-2xl m-auto" @click="validate">Procedi</button>
        </div>
    </div>
</template>

<script>
import schema from '@/components/plugins/tsi/admin/schema.js'
import selections from '@/components/plugins/tsi/admin/selections.js'
export default {
    name: 'TSIPluginPerson',
    data:()=>({
        schema: null,
        fields: null,
        selections: null,
        person:{
            "firstname": "",
            "lastname": "",
            "email": "",
            "age": "",
            "country": "",
            "gender": "",
            "education": "",
            "phone": "",
            "industry": "",
            "function": "",
            "role": ""
        }
    }),
    computed:{
        size(){
            return this.$attrs.size ? 
                this.$attrs.size === 'lg' ? 'h-10' : '' : ''
        }
    },
    beforeMount(){
        this.fields = Object.keys ( schema.persons )
        this.schema = schema.persons
        this.selections = selections
    },
    methods: {
        inputType(field){
            return field.type === 'string' || field.type === 'date' ?
                'text' :
                    field.type === 'number' ?
                        'number' : 
                            field.type === 'boolean' ?
                                'checkbox' : 
                                    field.type === 'email' ?
                                        'email' : false
        },
        validate(){
            let valid = true
            let error = []
            this.fields.forEach ( field => {
                if ( this.schema[field].required ){
                    if ( !this.person[field] ){
                        valid = false
                        error.push ( 
                            this.schema[field].label + ' obbligatorio'
                        )
                    }
                }
            })
            if ( !valid ){
                let msg = '<small>- ' + error.join('<br/>- ') + '</small>'
                this.$message ( msg )
            } else {
                this.person.survey_id = this.$mapState().datastore.dataset.survey._id
                this.$store.dispatch('dataset',{ table: 'person' , data: this.person })
                this.$emit ( 'person' , this.person )
            }
        }
    },
}
</script>