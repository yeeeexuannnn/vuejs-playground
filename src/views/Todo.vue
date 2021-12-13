<template>
  <div class="todo">
    <h1>This is an todo page</h1>
    <p>show:{{filiter}}</p>
    {{list}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      filiter: 'all'
    }
  },
  computed: {
    list () {
      return this.$store.getters.filiterList(this.filiter)
    }
  }
}
</script>
