<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    fetch('static/feriados.json')
      .then((r) => r.json())
      .then((result) => {
        localStorage.setItem('app-feriados', JSON.stringify(result))
        console.log(result)
      })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.table-h th, .table-h td { text-align: center;}
</style>
