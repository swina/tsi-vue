<template>
  <pre v-if="products">{{products[0]}}</pre>
</template>

<script>
export default {
  name: 'About',
  watch:{
    products(v){
      v[0].price = v[0].price + '.00'
    }
  },
  apollo: {
    products: {
      query: productQry,
      variables(){
        return {
          id: this.$route.params.id
        }
      }
    }
  }
}
</script>