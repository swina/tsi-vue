<template>
    <div v-if="domande">
        <div class="relative flex flex-col items-center md:items-start justify-center h-screen md:h-auto p-2 md:p-6 md:mt-6 lg:p-10 lg:mt-10 border rounded mx-1 md:mx-auto w-full md:w-10/12">
          
            <div style="font-family:monospace" class="shadow fixed bg-black p-2 rounded-full text-lime-400 top-0 right-0 m-1 text-3xl font-mono" v-if="seconds < 300">{{ elapsed }}</div>
                <div v-if="!layout" class="grid grid-cols-2">
                        <div class="w-1/2"></div>
                        <div class="grid items-center" :class="'grid-cols-' + datastore.dataset.survey.answers.length">
                            <template v-for="a in datastore.dataset.survey.answers">
                                <div class="flex text-sm items-center justify-center px-2 py-1">{{a}}</div>
                            </template>
                        </div>
                    </div>
                <transition :name="transition" mode="out-in">
                    
                    <div class="grid grid-cols-1 items-center w-full justify-center" :key="animator">
                        <template v-for="(n) in parseInt(pagination)">
    
                            <div class="w-full items-center" :class="!layout ? 'grid grid-cols-2 justify-center border-b border-dashed ':''">
                                <div class="flex flex-row items-center w-full">
                                    <div class="flex flex-row justify-center items-center text-base bg-gray-200 rounded-full mr-3 h-8 w-8 text-center shadow">{{(n+((page-1)*pagination))}}</div> 
                                    <div class="ml-2 text-xl font-bold leading-8">{{ domande.questions[(n+((page-1)*pagination))].domanda }}</div>
                                </div>
                                <div class="" :class="layout?'flex flex-col p-4 md:pl-10 mb-4':'py-4 mt-4 grid grid-cols-' + datastore.dataset.survey.answers.length">
                                    <template v-for="(risposta,r) in datastore.dataset.survey.answers">
                                        
                                        <div class="flex flex-row items-center text-base my-2" :class="!layout?' justify-center':''">
                                            <button class="flex flex-row items-center text-black bg-transparent border-0 hover:bg-transparent" @click="errore=null,setAnswer((n+((page-1)*pagination)),r+1)">
                                            <i class="material-icons risposte text-3xl text-gray-500" :risposta="r+1" :class="'risposta_' + (n+((page-1)*pagination))">radio_button_unchecked</i>
                                            <span class="ml-5 text-lg" v-if="layout">{{ risposta }}</span>
                                            </button>
                                        </div>
                                    </template>
                                </div>
                                
                            </div>
                            
                        </template>
                    </div>
                </transition>
            <button @click="next" class="mx-auto my-8 text-2xl">Procedi</button>
            <div :class="errore?'opacity-100':'opacity-0'" class="mt-2 bg-red-200 w-full p-1 h-8">{{ errore }}</div>
            <div :class="incompleto?'opacity-100':'opacity-0'" class="mt-2 bg-red-200 w-full p-1 h-8">
                {{ incompleto }} 
                <button class="danger" @click="risposte= {},incompleto='',simulation=!simulation">Esci</button>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'TSISurveyModule',
    data:()=>({
        person: true,
        intro: false,
        started: false,
        errore: '',
        incompleto: '',
        seconds: 0,
        index: 0,
        pagination: 1,
        page: 1,
        layout: false,
        timer: null,
        response:{},
        questionStart: 0,
        questionFilled: 0,
        questionario: null,
        timeout: 0,
        animator: null,
        transition: 'fade'
    }),
   
    computed:{
        ...mapState ( ['datastore'] ),
        domande(){
            this.pagination = this.datastore.dataset.survey.pagination
            this.questionStart = this.seconds
            return this.datastore.dataset.survey.questions.data[0]
        },
        total(){
            return Object.keys(this.domande.questions).length
        },
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
          this.transition = 'next'
          this.questionStart = this.seconds
      },
      started(v){
          if ( v ){
              this.start()
          }
      },
    },
    methods: {
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
            if ( risposte < ( this.page*this.pagination) ){
                this.$message ( 'Tutte le domande richiedono almeno una risposta')
                return 
            }
            this.animator = this.$randomID()
            window.sessionStorage.setItem('tsi',JSON.stringify(this.response))
            this.questionStart = this.seconds
            if ( risposte < this.total ){
                this.page += 1
                let elements = document.querySelectorAll('.risposte')
                elements.forEach ( el => { el.innerText = 'radio_button_unchecked' })
                window.scrollTo(0,0)
            } else {
                this.datastore.dataset.person.answers = this.response
                this.$emit('end')
            }
            
        },
    },
    mounted(){
        this.animator = this.$randomID()
        window.onresize = () =>{
            if ( window.innerWidth < 900 ){
                this.pagination = 1
                this.page = 1
                this.layout = true
            } else {
                this.pagination = this.datastore.dataset.survey.pagination
                this.layout = this.datastore.dataset.survey.answers_layout
                this.page = 1
            }
        }
        this.seconds = this.datastore.dataset.survey.timeout * 60
        this.start()
    },
    beforeDestroy(){
        window.clearInterval()
        this.timer = null
    }
}
</script>