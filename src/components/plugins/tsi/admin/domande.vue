<template>
    <div class="relative overflow-y-auto m-4 flex flex-col border-t border-l border-r">
        <template v-for="(domanda,i) in Object.keys($attrs.domande.questions)">
            <div class="flex flex-row border-b" v-if="i >= start && i <= (start+limit)">
                <div class="w-1/12 text-left mr-4 border-r p-1">{{ domanda }}</div>
                <input type="text" class="bg-white w-9/12 p-1 border-r" v-model="$attrs.domande.questions[domanda].domanda" style="font-family:'Arial'"/>
                <div class="w-2/12 p-1 text-gray-500"><i class="material-icons">delete</i></div>
            </div>
        </template> 
        <div class="w-full flex flex-row items-center p-2 justify-center">
            <button class="rounded-bl rounded-tl" @click="start > 0 ? start=start-limit : null"><i class="material-icons">chevron_left</i></button>
            <button class="rounded-tr rounded-br" @click="(start+limit) < total ? start=start+limit : null"><i class="material-icons">chevron_right</i></button>
        </div>
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
    </div>
</template>

<script>
export default {
    data:()=>({
        currentIndex:-1,
        start:0,
        limit: 10,
        edit: false
    }),
    computed: {
        total(){
            return Object.keys(this.$attrs.domande.questions).length
        }
    }
}
</script>