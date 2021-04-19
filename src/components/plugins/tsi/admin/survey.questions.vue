<template>
    <div v-if="questions" class="relative w-full overflow-y-auto m-4 flex flex-col">
        <template v-for="(question,i) in Object.keys(questions)">
            <div class="flex flex-row mb-1 items-center" v-if="i >= start && i < (start+limit)">
                <div class="w-10 text-right text-lg bg-gray-200 pr-2 mr-2 p-1">{{ question }}</div>
                <input type="text" class="bg-white w-9/12 p-1r" v-model="questions[question].domanda" style="font-family:'Arial'"/>
                <div class="w-2/12 p-1 text-gray-500"><i class="material-icons">delete</i></div>
            </div>
        </template> 
        <div v-if="Object.keys(questions).length" class="w-full flex flex-row items-center p-2 justify-center">
            <button class="rounded-bl rounded-tl" @click="start > 0 ? start=start-limit : null"><i class="material-icons">chevron_left</i></button>
            <button class="rounded-tr rounded-br" @click="(start+limit) < total ? start=start+limit : null"><i class="material-icons">chevron_right</i></button>
        </div>
        <div class="w-full flex flex-row items-center p-2 justify-center relative">
            <div v-if="!Object.keys(questions).length" class="relative w-full bg-gray-100 border-4 border-dashed border-gray-300 h-64 flex flex-col items-center justify-center" @click="checkImport=true">
                <input v-if="!questions.length" type="file" class="w-full absolute top-0 left-0 right-0 bottom-0 opacity-0" @change="loadTextFromFile"/>
                <button v-if="!questions.length" class="rounded text-xl">Importa Quesiti</button>
            </div>
            <!--<button v-else class="rounded success" @click="save">Salva Quesiti</button>-->
        </div>

        <transition name="fade">
            <moka-modal
                class="h-3/5"
                v-if="checkImport && json"
                size="lg"
                buttons="save"
                position="modal"
                @close="checkImport=!checkImport"
                @click_0="checkImport=!checkImport"
                @click_1="importQuestions">
                <div slot="title">Verifica Importazione Quesiti</div>
                <div slot="content" class="p-2">
                    <div class="my-4">Campi da importare: 
                        <div class="flex flex-col">
                            <template v-for="field in fieldNames">
                                <label><input type="checkbox" v-model="importFields[field]"> {{ field }}</label>
                            </template>
                        </div>
                    </div>
                    <div><i>Primi 5 quesiti di {{Object.keys(json).length}}</i></div>
                    <template v-for="(line,i) in Object.keys(json)">
                        <div class="flex flex-row my-2" v-if="i<5">
                            <div class="mr-2">{{line}}</div>
                            <div>{{json[line].domanda}}</div>    
                        </div>
                    </template>
                   
                </div>
            </moka-modal>
        </transition>
        <!--
        <transition name="fade">
            <moka-modal
                v-if="edit"
                size="md"
                @close="edit=!edit">
                <div slot="title">Modifica Domanda</div>
                <div slot="content" class="p-8">
                    <textarea class="w-full" v-model="$attrs.domande.questions[currentIndex].domanda"/>
                </div>
            </moka-modal>
        </transition>
        -->
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data:()=>({
        questions: null,
        currentIndex:-1,
        start:0,
        limit: 10,
        //total:0,
        edit: false,
        fieldNames: null,
        importFields: {},
        checkImport: false,
        create: false,
        json: {}
    }),
    computed: {
        ...mapState ( ['datastore'] ),
        total(){
            return Object.keys(this.questions).length
        }
    },
    methods: {
        save(){
            return
            this.$api.service ( 'questions' ).update ( this.questions )
        },
        loadTextFromFile(ev){
            this.checkImport = false
            const file = ev.target.files[0];
            const reader = new FileReader();

            reader.onload = e => { 
                let csv = e.target.result.replaceAll('"','') 
                csv = csv.split('\n')
                this.fieldNames = csv[0].split(',')
                csv.shift()
                this.json = {}
                csv.map ( (line,i) => {
                    let q = line.split(',')
                    if ( q[0] ){
                        this.json[q[0]] = {
                            domanda: q[1]
                        }
                    }
                })
                this.checkImport = true
            }
            reader.readAsText(file)
        },
        importQuestions(){
            let questions = {}
            Object.keys(this.json).map ( line => {
                this.fieldNames.map ( (field,i) => {
                    if ( field != 'nr'){
                        questions[line] = this.json[line]
                    }
                })
            })
            this.questions = questions 
            this.$store.dispatch ( 'dataset' , { table: 'questions' , data: this.questions })
            this.checkImport = false
        }
    },
    mounted(){
        if ( this.$attrs.survey ){
            this.$api.service('questions').find ( {
                query: {
                    id: this.$attrs.survey
                }
            }).then ( result => {
                this.$store.dispatch ( 'dataset' , { table: 'questions' , data : result.data[0].questions })
                this.questions = result.data[0].questions
                //this.total = Object.keys(this.questions).length
            })
        } else {
            if ( this.datastore.dataset.questions ){
                this.questions = this.datastore.dataset.questions 
            } else {
                this.questions = []
            }
            //this.total = 0
        }
    }
}
</script>