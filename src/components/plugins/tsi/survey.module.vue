<template>
    <div v-if="domande">
        <div class="relative flex flex-col items-center md:items-start justify-center h-screen md:h-auto p-2 md:p-6 md:mt-6 lg:p-10 lg:mt-10 border rounded mx-1 md:mx-auto w-full md:w-10/12">
            <div style="font-family:monospace" class="shadow fixed bg-black p-2 rounded-full text-lime-400 top-0 right-0 m-1 text-3xl font-mono">{{ elapsed }}</div>
                <transition :name="transition" mode="out-in">
                    <div class="grid grid-cols-1 items-center justify-center h-full" :key="animator">
                    <template v-for="n in pagination">
                        
                        <div class="w-full">
                            <div class="flex flex-row items-center">
                                <div class="p-1 text-base bg-gray-200 rounded-full mr-3 h-8 w-8 text-center shadow">{{(n+((page-1)*pagination))}}</div> 
                                <div class="text-xl font-bold leading-8">{{ domande.questions[(n+((page-1)*pagination))].domanda }}</div>
                            </div>
                            <div class="flex flex-col p-4 md:pl-10 mb-4">
                                <template v-for="(risposta,r) in datastore.dataset.survey.answers">
                                    
                                    <div class="flex flex-row items-center text-base my-2">
                                        <button class="flex flex-row items-center text-black bg-transparent border-0 hover:bg-transparent" @click="errore=null,setAnswer((n+((page-1)*pagination)),r+1)">
                                        <i class="material-icons risposte text-3xl text-gray-500" :risposta="r+1" :class="'risposta_' + (n+((page-1)*pagination))">radio_button_unchecked</i>
                                        <span class="ml-5 text-lg">{{ risposta }}</span>
                                        </button>
                                    </div>
                                </template>
                            </div>
                        </div>
                        
                    </template>
                </div>
                </transition>
            <button @click="next" class="m-auto mb-4 text-2xl">Procedi</button>
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
            return this.datastore.dataset.survey.questions.data[0]
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
      }
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
            this.page += 1
            let elements = document.querySelectorAll('.risposte')
            elements.forEach ( el => { el.innerText = 'radio_button_unchecked' })
            
            window.scrollTo(0,0)
            
        },
    },
    mounted(){
        this.animator = this.$randomID()
        window.onresize = () =>{
            if ( window.innerWidth < 800 ){
                this.pagination = 1
                this.page = 1
            } else {
                this.pagination = this.datastore.dataset.survey.pagination
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