<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Links</h2>
    <ul>
      <li>
          <a href="#" target="_blank">Config</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Bem Vindo a folha Ponto IFRO'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
