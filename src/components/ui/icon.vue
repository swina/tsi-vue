<template>
    <i class="material-icons" @click="$emit('click')">{{name}}</i>
</template>
<script>
export default {
    name: 'MokaIconElement',
    props: ['name'],
}
</script>