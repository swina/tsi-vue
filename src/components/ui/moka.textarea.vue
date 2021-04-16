<template>
    <textarea :class="el.css" :value="el.content"/>
</template>

<script>
export default {
    name: 'MokaTextareaElement',
    props:['el']
}
</script>