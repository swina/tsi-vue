<template>
    <component :type="field.type" :required="field.required"></component> 
</template>

<script>
export default {
    computed:{
        field(){
            return this.$attrs.field.type === 'string' ?
                { type: 'text' , required : this.$attrs.field.required } :
                    this.$attrs.field.type === 'number' ?
                        { type : 'number' , required: this.$attrs.field.required }  : null 
        }
    }
}
</script>