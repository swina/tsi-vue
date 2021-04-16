<template>
    
        <!-- <moka-modal
            v-if="domande"
            size="fullscreen"
            position="modal"
            buttons="none"
            @close="simulationEnd=!simulationEnd">
            <div slot="title">{{ record.progetto }}</div>
            <div slot="content" class="mx-10 p-10 my-6 relative"> -->
    <div>
        <div class="p-2 lg:px-24 lg:pt-10 w-full md:w-8/12 m-auto" v-if="person && questionario">
            <person size="lg" :title="questionario.project" @person="register"/>
        </div>
        <intro v-if="questionario && intro" :content="questionario.description"/>

        <div class="w-full text-center">
            <button v-if="intro" class="text-2xl m-auto" @click="started=!started">Procedi</button>
        </div>
        <div v-if="domande && started" class="relative flex flex-col items-center md:items-start justify-center h-screen md:h-auto p-2 md:p-10 md:mt-10 border rounded mx-1 md:mx-auto w-full md:w-10/12">
            <div style="font-family:monospace" class="shadow fixed bg-black p-2 rounded-full text-lime-400 top-0 right-0 m-1 text-3xl font-mono">{{ elapsed }}</div>
            <template v-for="n in pagination">
                <div class="w-full">
                    <div class="flex flex-row items-center">
                        <div class="p-1 text-base bg-gray-200 rounded-full mr-3 h-8 w-8 text-center shadow">{{(n+((page-1)*pagination))}}</div> 
                        <div class="text-2xl leading-8">{{ domande.questions[(n+((page-1)*pagination))].domanda }}</div>
                    </div>
                    <div class="flex flex-col p-4 md:pl-10 mb-4">
                        <template v-for="(risposta,r) in questionario.answers">
                            <!-- <div class="flex flex-row items-center text-base my-2">
                                <input type="checkbox" :value="r+1" :name="'risposta_' + (n+((page-1)*pagination))" class="risposte mr-2 md:w-3 md:h-3 w-5 h-5 mr-5" :class="'risposta_' + (n+((page-1)*pagination))" @input="errore=null,setAnswer((n+((page-1)*pagination)),r+1)"/> 
                                <span class="ml-5">{{ risposta }}</span>
                            </div> -->
                            <div class="flex flex-row items-center text-base my-2">
                                <button class="flex flex-row items-center text-black bg-transparent border-0 hover:bg-transparent" @click="errore=null,setAnswer((n+((page-1)*pagination)),r+1)">
                                <i class="material-icons risposte text-3xl text-gray-500" :risposta="r+1" :class="'risposta_' + (n+((page-1)*pagination))">radio_button_unchecked</i>
                                <!-- <input type="checkbox" :value="r+1" :name="'risposta_' + (n+((page-1)*pagination))" class="z-0 risposte mr-2 md:w-3 md:h-3 w-5 h-5 mr-5" :class="'risposta_' + (n+((page-1)*pagination))"/>  -->
                                <span class="ml-5 text-lg">{{ risposta }}</span>
                                </button>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
            <button @click="next" class="absolute bottom-0 m-auto mb-4 text-2xl">Procedi</button>
            <div :class="errore?'opacity-100':'opacity-0'" class="mt-2 bg-red-200 w-full p-1 h-8">{{ errore }}</div>
            <div :class="incompleto?'opacity-100':'opacity-0'" class="mt-2 bg-red-200 w-full p-1 h-8">
                {{ incompleto }} 
                <button class="danger" @click="risposte= {},incompleto='',simulation=!simulation">Esci</button>
            </div>
        </div>
    </div>
    
</template>

<script>
import Intro from './start'
import Person from './person'
export default {
    name: 'TSIPluginSimulator',
    components: { Intro , Person },
    data:()=>({
        person: true,
        intro: false,
        started: false,
        errore: '',
        incompleto: '',
        domande: null,
        seconds: 0,
        index: 0,
        pagination: 1,
        page: 0,
        timer: null,
        response:{},
        questionStart: 0,
        questionFilled: 0,
        questionario: null,
        timeout: 0
    }),
    computed:{
        elapsed(){
            // Pad to 2 or 3 digits, default is 2
            function pad(n, z) {
                z = z || 2;
                return ('00' + n).slice(-z);
            }
            let s = this.seconds * 1000
            var ms = s % 1000 ;
            s = (s - ms) / 1000;
            var secs = s % 60;
            s = (s - secs) / 60;
            var mins = s % 60;
            var hrs = (s - mins) / 60;

            return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
        }
    },
    watch:{
      page(v){
          this.questionStart = this.seconds
      },
      started(v){
          if ( v ){
              this.start()
          }
      }
    },
    methods: {
        register(person){
            this.$api.service('persons')
        },
        start(){
            let vm = this
            window.setInterval(()=>{
                vm.seconds--
            },1000)
        },
        setAnswer(quest,response){
            let elements = document.querySelectorAll('.risposta_' + quest)
            elements.forEach ( el => {
                if ( parseInt(el.getAttribute('risposta')) === parseInt(response) ){
                    el.innerText = 'radio_button_checked'
                } else {
                    el.innerText = 'radio_button_unchecked'
                }
            })
            this.response[quest] = {
                a: parseInt(response),
                t: this.questionStart - this.seconds
            }
            this.questionStart = this.seconds
        },
        next(){
            let risposte = Object.keys ( this.response).length
            console.log ( Object.keys( this.response) , ( this.page * this.pagination ) )
            if ( risposte < ( this.page*this.pagination) ){
                this.$message ( 'Tutte le domande richiedono almeno una risposta')
                return 
            }
            window.sessionStorage.setItem('tsi',JSON.stringify(this.response))
            this.questionStart = this.seconds
            this.page += 1
            let elements = document.querySelectorAll('.risposte')
            elements.forEach ( el => { el.innerText = 'radio_button_unchecked' })

            /*
            if (  !this.userRisposta[this.index+1] ) {
                this.errore = 'Indicare una scelta'
                return
            }
            this.errore = ''
            let risposta = {
                risposta : this.userRisposta[this.index+1] ,
                elapsed : parseInt(this.seconds) - parseInt ( this.questionStartedAt )  
            }
            this.userRisposta[this.index+1] = risposta
            this.questionStartedAt = this.seconds
            this.index = this.index + 1
            */
        },
    },
    mounted(){
        let id 
        this.$attrs.filter ? 
             id = this.$attrs.filter :
                id = this.$route.params.id

        this.$api.service ( 'surveys' ).get ( id ).then ( res => {
            this.questionario = res
            this.record = res
            this.pagination = res.pagination
            if ( window.innerWidth < 800 ){
                this.pagination = 1
            }
            return res
        }).then ( quest => {

            this.$api.service ( 'questions' ).find ( {
                query : {
                    id: quest._id
            }
            }).then ( res => {
                this.domande = res.data[0] 
                this.seconds = quest.timeout * 60
                this.page = 1
            })
        })
        window.onresize = () =>{
            if ( window.innerWidth < 800 ){
                this.pagination = 1
                this.page = 1
            } else {
                this.pagination = this.questionario.pagination
                this.page = 1
            }
        }

    },
    beforeDestroy(){
        window.clearInterval()
        this.timer = null
    }
}
</script>

