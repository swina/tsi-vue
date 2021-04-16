<template>
    <input :type="el.type" :class="el.css" :value="el.content" :required="el.required"/>
</template>

<script>
export default {
    name: 'MokaInputElement',
    props:['el']
}
</script>