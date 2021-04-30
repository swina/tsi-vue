<template>
    <div class="m-2">
        <button :class="tab===0?'bg-blue-400':''" @click="tab=0">Generale</button>
        <button :class="tab===2?'bg-blue-400':''" @click="tab=2">Risposte</button>
        <button :class="tab===3?'bg-blue-400':''" @click="tab=3">Domande</button>
        <button :class="tab===1?'bg-blue-400':''" @click="tab=1">Descrizione</button>
        <button :class="tab===4?'bg-blue-400':''" @click="tab=4">Resume</button>
        <div class="grid grid-cols-2 gap-4 p-8 border rounded" v-if="schema">
            <template v-for="field in Object.keys(schema)">
                
                <div :class="schema[field].type==='text'?'col-span-2':''" class="flex flex-col" v-if="schema[field].tab===tab && schema[field].type!='boolean'">
                    <label class="font-bold capitalize">{{schema[field].label}}</label>
                    
                    <input v-if="schema[field].tab===tab && schema[field].type==='string'" type="text" class="w-full" v-model="record[field]" @input="$emit($event.target.value)" :readonly="schema[field].readonly"/>

                    <input v-if="schema[field].tab===tab && schema[field].type==='number'" type="number" min="1" class="w-full" v-model="record[field]" @input="$emit($event.target.value)"/>
                    
                    <textarea v-if="schema[field].type==='excerpt'" class="w-full" v-model="record[field]"/>

                    <div v-if="schema[field].tab===tab && schema[field].type==='text'" >
                        <v-editor class="w-full" v-if="schema[field].type==='text'" v-model="record[field]"/>
                    </div>


                    
                    
                    <div v-if="schema[field].tab===tab && schema[field].type==='array'">
                        <draggable>
                        <template v-for="(option,index) in record[field]">
                            <div class="flex flex-row">
                                <input type="text" class="w-full" v-model="record[field][index]"/> <i class="material-icons ml-2" @click="removeOption(index,field)">delete</i>
                                <i class="material-icons ml-2 text-base text-gray-400 cursor-move">open_with</i>
                            </div>
                        </template>
                        </draggable>
                        <div class="flex flex-row items-center mt-4 p-1 bg-gray-100">
                            <input class="mr-2" type="text" v-model="newOption[field]"/>
                            <button @click="addOption(field)">Aggiungi</button>
                        </div>
                    </div>

                    
                    <div v-if="schema[field].tab===tab && schema[field].type==='date'">
                        <input type="text" :value="record[field]" class="w-24"/>
                    </div>
                </div>
                <div v-if="schema[field].tab===tab && schema[field].type==='boolean'" class="flex flex-row justify-start">
                    <input v-if="schema[field].type==='boolean'" type="checkbox" class="mr-4" v-model="record[field]" @input="$emit($event.target.value)"/><span class="ml-2 capitalize">{{schema[field].label}}</span>
                </div>
            </template>
            <div v-if="tab===3" class="w-full col-span-2">
                <survey-questions :survey="$attrs.value._id"/>
            </div>
        </div>
        <transition name="fade">
            <moka-modal
                v-if="editor"
                size="lg"
                position="modal"
                @close="editor=!editor">
                <div slot="title">Editor</div>
                <div slot="content">
                    <v-editor v-model="record.description"/>
                </div>
            </moka-modal>
        </transition>
    </div>
</template>

<script>
import schema from '@/components/plugins/tsi/admin/schema.js'
import VEditor from '@/components/ui/moka.text.editor'
import SurveyQuestions from './survey.questions'
import draggable from 'vuedraggable'

export default {
    name: 'TSISurveyAdmin',
    components: { VEditor , SurveyQuestions , draggable },
    props: ['data'],
    data:()=>({
        editor: false,
        tab: 0,
        record: {},
        currentField:null,
        domande: null,
        editDomande: false,
        total: 0,
        newOption: {},
        newOptionValue: ''
    }),
    computed:{
        schema(){
            return schema.questionario
        }
    },
    watch:{
        newOption(v){
           return null
        }
    },
    methods:{
        dateField(field,val){
            console.log ( val )
            let v = this.schema[field].format(val)
            return v
        },
        updateArray(index,field,val){
            this.$attrs.value[field][index] = val
            console.log ( index ,this.$attrs.value[field][index],val)
        },
        updateField(field,val){
            let data = val.split('/')
            data = data[2] + data[1] + data[0]
            this.$attrs.value[field] = data
       },
        addOption ( field ){
            this.record[field].push ( this.newOption[field] )
            this.newOption[field]=''
            console.log ( this.record[field] )
        },
        removeOption ( index , field ){
            console.log ( index , field )
            this.$attrs.value[field].splice ( index , 1 )
        },
        getDomande(){
            if ( this.$attrs.value.id ){
                this.$api.service('questions').find ( {
                    query: {
                        id: this.$attrs.value.id
                    }
                }).then ( res => {
                    //this.total = Object.keys(res.data[0].questions).length
                    this.domande = res.data[0] 
                    this.total = Object.keys(this.domande.questions).length 
                })
            } else {
                this.domande = []
                this.total = 0
            }
        },
    },
    mounted(){
        this.record = this.$attrs.value
        this.getDomande()

    }
}
</script>