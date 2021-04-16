<template>
    <div class="fixed z-highest bg-white h-screen w-screen top-0 left-0 bottom-0 right-0">
        <div class="absolute z-highest top-0 right-0 h-8 px-2 flex flex-row items-center text-gray-400 text-xls" >
            <i class="material-icons" @click="$emit('close')">close</i>
        </div>
        <div class="bg-black text-white text-sm flex flex-row items-center bg-gray-800 text-white  rounded-tl rounded-tr px-2 py-1">
            <slot name="title"></slot>
        </div>
        <div class="absolute overflow-y-auto w-full">
            <slot name="content">
            </slot>
        </div> 
    </div>
</template>

<script>
export default {
    name: 'WhoobeModalFullscreen',
    props: ['name'],
    computed:{
        component(){
            return () =>  import( '@/components/' + this.name )
        }
    }
}
</script>