<template>
    <div class="grid grid-cols-1 w-11/12 text-sm ml-8 mt-4 border-t border-l border-r">
        <div :class="'bg-gray-300 p-2 grid grid-cols-' + (Object.keys(schema.questionario).length)" v-if="!login">
            <template v-for="field in Object.keys(schema.questionario)">
                    <div v-if="field!='_id' && schema.questionario[field].list" class="font-bold capitalize">{{ field  }}</div>
                </template>
            <div class=""></div>
        </div>
        <template v-for="questionario in questionari">
            <div :class="'p-2 border-b w-full hover:bg-gray-200 cursor-pointer grid grid-cols-' + (Object.keys(schema.questionario).length)">
                <template v-for="field in Object.keys(schema.questionario)">
                    <div v-if="field!='_id' && schema.questionario[field].list">{{ schema.questionario[field].format(questionario[field]) }}</div>
                </template>
                <div class="flex flex-row justify-end col-span-3">
                    <button  @click="record=questionario,edit=!edit">Modifica</button>
                    <button class="mx-2" @click="getDomande(questionario),record=questionario,updateDomande=!updateDomande">Domande</button>
                    <button  @click="simulator(questionario._id)">Simula</button> CODE [a763va]
                </div>
            </div>
        </template>
        <transition name="fade">
            <moka-modal
                v-if="questionario && domande && updateDomande"
                size="lg"
                position="modal"
                buttons="save"
                @close="updateDomande=!updateDomande"
                @click_0="updateDomande=!updateDomande"
                @click_1="save">
                <div slot="title">{{ record.project }}</div>
                <div slot="content">
                    <v-domande :domande="domande"/>
                </div>
            </moka-modal>
        </transition>
        <transition name="fade">
        <moka-modal
            v-if="simulation"
            size="lg"
            position="modal"
            buttons="none"
            @close="simulation=!simulation">
            <div slot="title">Persone</div>
            <div slot="content" class="p-4 relative">
                <v-person/>
                <div :class="errore?'opacity-100':'opacity-0'" class="mt-2 bg-red-200 w-full p-1 h-8">{{ errore }}</div>
                <div :class="incompleto?'opacity-100':'opacity-0'" class="mt-2 bg-red-200 w-full p-1 h-8">{{ incompleto }} <button class="danger" @click="userRisposta= {},incompleto='',simulation=!simulation">Esci</button></div>
            </div>
        </moka-modal>
        </transition>
        <transition name="fade">
        <moka-modal
            v-if="edit"
            size="full"
            position=""
            @close="edit=!edit"
            @click_0="edit=!edit"
            @click_1="save">
            <div slot="title">{{ record.project }}</div>
            <v-questionario slot="content" v-if="edit" v-model="record"/>
        </moka-modal>
        </transition>
        
    </div>
</template>
<script>

import schema from '@/components/plugins/tsi/admin/schema.js'
import VQuestionario from './survey.admin'
import VDomande from './domande'
import VPerson from '@/components/plugins/tsi/person'
export default {
    name: 'TSIPluginDashboard',
    components: { VQuestionario , VDomande , VPerson },
    data:()=>({
        login: false,
        user: {
            email:'',
            password:''
        },
        editor: false,
        questionari: null,
        questionario: null,
        record: null,
        domande: null,
        updateDomande: false,
        simulation: false,
        simulationEnd: false,
        errore: '',
        incompleto: '',
        edit: false,
        index: 0,
        total: 0,
        seconds: 0,
        userRisposta:{},
        questionStartedAt: 0
    }),
    computed:{
        schema(){
            return schema
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
        simulation(v){
            if ( v ){
                window.setInterval(()=>{
                    this.seconds +=1
                },1000)
            }
        },
        simulationEnd(v){
            if ( v ){
                console.log ( Object.keys(this.userRisposta).length  )
                if ( Object.keys(this.userRisposta).length < Object.keys(this.domande.questions).length ){
                    this.incompleto = 'Non hai completato il questionario. Vuoi comunque interrompere?'
                }
            }
        }
    },
    methods:{
        next(){
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
        },
        simulator(id){
            let route = this.$router.resolve({ path: "/survey" });
            var w = window.open(route.href, "tsi",'width=' + window.screen.availWidth );
            // this.$mapState().desktop.tabs.push ( {
            //     component: () => import ( '@/components/plugins/tsi/questionario') ,
            //     name: 'Questionario' ,
            //     icon: null,
            //     filter: id,
            //     ref: this.$randomID(),
            //     resumeAction: null,
            //     blocks: null,
            // })
            // this.$mapState().desktop.currentTab = this.$mapState().desktop.tabs.length -1
        },
        getDomande(questionario){
            this.questionario = questionario
            this.$api.service('questions').find ( {
                query: {
                    id: questionario.id
                }
            }).then ( res => {
                //this.total = Object.keys(res.data[0].questions).length
                this.domande = res.data[0] 
                this.total = Object.keys(this.domande.questions).length 
            })
        },
        save(){
            this.$api.service('surveys').patch ( this.record._id , this.record ).then ( res=> {
                console.log ( res )
                this.edit = false
                this.$message ( 'Questionario salvato')
            })
        },
        loadData(){
            this.$api.service('surveys').find().then ( res => {
                console.log ( res )
                this.$store.dispatch('dataset',{table: 'surveys' , data: res.data })
                this.questionari = res.data
            })
        },
        doLogin(){
            this.$api.authenticate({
                email: this.user.email,
                password: this.user.password,
                strategy: 'local'
            }).then ( user => {
                console.log ( user )
                this.login = false
                this.loadData()
            }).catch ( err => {
                console.log ( err )
                this.$message ( 'Email o password errati!')
            })
        }
    },
    mounted(){
        this.$api.authenticate().then ( resp => {
            console.log ( 'authenticated')
            this.loadData()
        }).catch ( err => {
            this.login = true
        })
    }
}
</script>
