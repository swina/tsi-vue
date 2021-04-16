<template>
    <div v-if="questions" class="relative w-full overflow-y-auto m-4 flex flex-col">
        <template v-for="(question,i) in Object.keys(questions)">
            <div class="flex flex-row mb-1 items-center" v-if="i >= start && i <= (start+limit)">
                <div class="w-10 text-right text-lg bg-gray-200 pr-2 mr-2 p-1">{{ question }}</div>
                <input type="text" class="bg-white w-9/12 p-1r" v-model="questions[question].domanda" style="font-family:'Arial'"/>
                <div class="w-2/12 p-1 text-gray-500"><i class="material-icons">delete</i></div>
            </div>
        </template> 
        <div class="w-full flex flex-row items-center p-2 justify-center">
            <button class="rounded-bl rounded-tl" @click="start > 0 ? start=start-limit : null"><i class="material-icons">chevron_left</i></button>
            <button class="rounded-tr rounded-br" @click="(start+limit) < total ? start=start+limit : null"><i class="material-icons">chevron_right</i></button>
        </div>
        <div class="w-full flex flex-row items-center p-2 justify-center">
            <button class="rounded success" @click="save">Salva Quesiti</button> 
        </div>
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
export default {
    data:()=>({
        questions: null,
        currentIndex:-1,
        start:0,
        limit: 10,
        total:0,
        edit: false
    }),
    computed: {
    },
    methods: {
        save(){
            return
            this.$api.service ( 'questions' ).update ( this.questions )
        }
    },
    mounted(){
        this.$api.service('questions').find ( {
            query: {
                id: this.$attrs.survey
            }
        }).then ( result => {
            this.$store.dispatch ( 'dataset' , { table: 'questions' , data : result.data[0].questions })
            this.questions = result.data[0].questions
            this.total = Object.keys(this.questions).length
        })
    }
}
</script>