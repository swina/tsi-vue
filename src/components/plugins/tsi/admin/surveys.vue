<template>
    <div class="text-sm w-full m-auto border shadow" :key="viewKey">
        <button @click="createNew()">Crea</button>
        <div :class="'bg-gray-500 text-gray-200 p-2 pb-1 items-center justify-center grid grid-cols-' + (cols+1)">
            <template v-for="field in fields">
                <div v-if="field!='_id' && schema[field].list" class="capitalize">{{ schema[field].label.split(' ')[0]  }}</div>
            </template>
            <div class=""></div>
        </div>
        <template v-for="survey in datastore.dataset.surveys">
            <div :class="'p-2 pb-1 border-b w-full hover:bg-gray-100 items-center cursor-pointer grid grid-cols-' + (cols+1)">
                <template v-for="field in fields">
                    <div v-if="field!='_id' && schema[field].list">{{ schema[field].format(survey[field]) }}</div>
                </template>
                <div class="flex flex-row justify-around items-center">
                    <icon class="text-base hover:text-blue-300" name="edit" @click="record=survey,edit=!edit" title="Modifica"/>
                    <icon class="text-base hover:text-blue-300" name="file_copy" @click="record=survey,clone()" title="Clona Questionario"/>
                    <icon class="text-base hover:text-blue-300" name="people" @click="record=survey,tab('persons')" title="Utenti"/>
                    <icon class="text-base hover:text-blue-300" name="file_download" @click="record=survey,download(),confirmDownload=!confirmDownload" title="Scarica Questionari"/>
                    <icon class="text-base hover:text-blue-300" name="launch" @click="simulator(survey._id)" title="Test"/>
                    <icon class="text-base hover:text-blue-300" name="delete" @click="record=survey,removeSurvey=!removeSurvey" title="Elimina"/>
                </div>
            </div>
        </template>

        

        <transition name="fade">
            <div>
                <moka-modal
                    v-if="edit"
                    size="full"
                    position=""
                    @close="edit=!edit"
                    @click_0="edit=!edit"
                    @click_1="save">
                    <div slot="title">{{ record.project }}</div>
                    <survey-admin slot="content" v-if="edit" v-model="record"/>
                </moka-modal>
                <moka-modal
                    size="sm"
                    position="modal"
                    v-if="confirmDownload"
                    buttons="none"
                    @close="confirmDownload=!confirmDownload"
                    @click_0="confirmDownload=!confirmDownload"
                    @click_1="download">
                    <div slot="title">Download</div>
                    <div slot="content" class="h-28 items-center text-center relative cursor-pointer" @click="downloadCSV">
                        <div class="absolute bg-gray-600 text-white w-full top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center">
                            <icon name="file_download">
                            </icon>
                            <div class="btn-download">Download</div>
                        </div> 
                    </div>
                </moka-modal>
                <!-- <moka-modal
                    v-if="persons"
                    size="full"
                    position=""
                    buttons="none"
                    @close="persons=!persons">
                    <div slot="title">{{ record.project }}</div>
                    <survey-persons slot="content" v-if="persons" :survey="record._id"/>
                </moka-modal> -->
            </div>
        </transition>
        <transition name="fade">
            <moka-modal
                v-if="removeSurvey"
                size="sm"
                position="modal"
                @close="removeSurvey=!removeSurvey"
                @click_0="removeSurvey=!removeSurvey"
                @click_1="deleteSurvey()">
                <div slot="title">Elimina Questionario</div>
                <div slot="content">
                    <div class="h-40 items-center p-6">
                        Confermi di voler eliminare<br>{{ record.project }}
                    </div>
                </div>
            </moka-modal>
        </transition>
    </div>
</template>

<script>
//import schema from '@/components/plugins/tsi/admin/schema.js'
import { mapState } from 'vuex'
import SurveyAdmin from './survey.admin'
import SurveyPersons from './survey.persons'
import jp from 'jsonpath'
import { json2csv } from 'json-2-csv'
export default {
    name: 'TSISurveysAdmin',
    components: { SurveyAdmin , SurveyPersons },
    data:()=>({
        viewKey: null,
        schema: null,
        fields: null,
        record: null,
        persons: false,
        edit: false,
        confirmDownload: false,
        removeSurvey: false
    }),
    watch:{
        
    },
    computed:{
        ...mapState ( [ 'desktop' , 'datastore'] ),
        cols(){
            let c = 0
            if ( this.fields ){
                this.fields.forEach ( field => {
                    if ( this.schema[field].list ){
                        c++
                    }
                })
            }
            return c
        }
    },
    methods:{
        simulator(id){
            let route = this.$router.resolve({ path: "/survey" });
            var w = window.open(route.href, "tsi",'width=' + window.screen.availWidth );
        },
        save(){
            this.record.hasOwnProperty('_id') ?
                this.$api.service('surveys').patch ( this.record._id , this.record ).then ( res=> {
                    this.edit = false
                    this.$message ( 'Dati salvati con successo')
                }) : this.create()

        },
        create(){
            this.record.keycode = this.$randomKey()
            this.$api.service('surveys').create ( this.record ).then ( survey => {
                var _id = survey._id
                //this.datastore.dataset.surveys.push ( survey )
                this.$api.service('surveys_keys').create ( {
                    key: survey.keycode ,
                    survey: _id
                }).then ( survey_key => {
                    this.$api.service('questions').create ( {
                        id: _id ,
                        questions: this.datastore.dataset.questions 
                    }).then ( res => {
                        this.$message ( 'Creato nuovo questionario' )
                    })
                })
            })
        },
        clone(){
            let survey = Object.assign({},this.record)
            survey.keycode = this.$randomKey()
            survey.project = this.record.project + ' COPIA'
            let questions
            delete survey._id
            this.$api.service('questions').find ( { query : { id: this.record._id} } ).then ( result => {
                questions = result.data[0]
                console.log ( survey )
                console.log ( questions )
                var survey_id 
                this.$api.service ( 'surveys' ).create ( survey ).then ( response => {
                    this.datastore.dataset.surveys.push ( response )
                    survey_id = response._id
                    this.$api.service ( 'surveys_keys' ).create ( 
                        {
                            key: survey.keycode,
                            survey: survey_id
                        }
                        
                    ).then ( (response) => {
                        this.$api.service ( 'questions' ).create (
                            {
                                id: survey_id,
                                questions : questions.questions
                            }
                        ).then ((resp)=> {
                            console.log ( resp , )
                            this.$message ( 'Questionarion clonato' )
                            this.viewKey = this.$randomID()
                        })
                    })
                })
            })
            
        },
        deleteSurvey(){
            this.$api.service ( 'surveys' ).remove ( this.record._id ).then ( resp => {
                let surveys = this.datastore.dataset.surveys.filter ( surv => {
                    return surv._id != resp._id
                })
                this.$store.dispatch ( 'dataset' , { table: 'surveys' , data: surveys } )
                this.$api.service ( 'questions' ).find ( {
                    query: {
                         id: this.record._id
                    }
                }).then ( quest => {
                    console.log ( quest , this.record._id)
                    this.$api.service ( 'questions' ).remove ( quest.data[0]._id )
                })
                this.$message ( 'Questionario rimosso' )
                this.removeSurvey = false
                //remove survey key
                // this.$api.service ( 'surveys_keys' ).find ( {
                //     query: {
                //         id: resp._id
                //     }
                // }).then ( key => {
                //     this.$api.service ( 'surveys_keys' ).remove ( key._id )
                //     //remove questions
                //     this.$api.service ( 'questions' ).find ( {
                //     query: {
                //         id: key._id
                //     }
                //     }).then ( quest => {
                //         this.$api.service ( 'questions' ).remove ( quest._id )
                //     })
                // })
            })
        },
        tab(name){
            this.desktop.tabs.push ( {
                component: () => import ( '@/components/plugins/tsi/admin/survey.' + name ) ,
                name: 'Utenti' ,
                icon: 'people',
                filter: this.record,
                ref: this.$randomID(),
                resumeAction: null,
                blocks: null,
            })
            this.desktop.currentTab = this.desktop.tabs.length -1
        },
        createNew(){
            this.record = {}
            console.log ( 'KEY=>' , this.$randomKey() )
            Object.keys(this.schema).map ( field => {
                this.record[field] = this.schema[field].default
            })
            this.record.project = 'Nuovo questioario'
            this.record.date = new Intl.DateTimeFormat('it-IT').format(new Date)
            this.record.answers = this.datastore.dataset.schema.answers

            this.edit = true
        },
        downloadCSV(){
            let el = document.querySelector('#download-csv')
            el.click()
            document.body.removeChild( el )
            this.confirmDownload = false
        },
         download(){
             let vm = this
            this.$api.service('persons').find ( { query: { survey_id: vm.record._id }}).then ( res => {
                let download = res.data.map ( person => {
                    if ( person.hasOwnProperty('answers') ){
                        let q = {}
                        Object.keys(person.answers).map(a=>{
                            return q[a] = person.answers[a].a
                        })
                        let t = {}
                        Object.keys(person.answers).map(a=>{
                            return t[a] = person.answers[a].t
                        })
                        return {
                            person: person.firstname + ' ' + person.lastname ,
                            email: person.email,
                            date: new Intl.DateTimeFormat('it-IT').format(new Date(parseInt(person._id.substring(0, 8), 16) * 1000)),
                            q: q, //answers,//jp.query(person.answers,'$..a'),
                            t: t //jp.query(person.answers,'$..t')
                        }
                    }
                })
                function json2csvCallback (err, csv) {
                    if (err) throw err;
                    console.log(csv);
                    var downloadLink = document.createElement("a");
                    var blob = new Blob(["\ufeff", csv]);
                    var url = URL.createObjectURL(blob);
                    downloadLink.setAttribute('id','download-csv')
                    downloadLink.href = url;
                    downloadLink.download = vm.record.project + ".csv";  //Name the file here
                    document.body.appendChild(downloadLink);
                    document.querySelector('.btn-download').innerText = vm.record.project + '.csv'
                    //downloadLink.click();
                    //document.body.removeChild(downloadLink);
                    //vm.confirmDownload = false
                };

                json2csv(download,json2csvCallback,{unwindArrays:false})
                // var items = download;
                // const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
                // const header = Object.keys(items[0]);
                // let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
                // csv.unshift(header.join(','));
                // csv = csv.join('\r\n');

                // //Download the file as CSV
                // var downloadLink = document.createElement("a");
                // var blob = new Blob(["\ufeff", csv]);
                // var url = URL.createObjectURL(blob);
                // downloadLink.href = url;
                // downloadLink.download = "DataDump.csv";  //Name the file here
                // document.body.appendChild(downloadLink);
                // downloadLink.click();
                // document.body.removeChild(downloadLink);
                console.log ( download )
            })
        }
    },
    beforeMount(){
        this.viewKey = this.$randomID()
        this.fields = Object.keys(this.datastore.dataset.schema.surveys)
        this.schema = this.datastore.dataset.schema.surveys
    }
}
</script>