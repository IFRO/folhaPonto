<template>
  <div class="config">

      <div class="card d-print-none">
          <p class="card-header">Configuração da folha ponto</p>
          <div class="card-body">
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Ano</label>
                  <input class="form-control" type="text" v-model="fp.ano" placeholder="ano">
                </div>

              </div>
              <div class="col">
                <div class="form-group">
                  <label>Mes</label>
                  <select v-model.lazy.number="fp.mes" class="form-control">
                    <option v-for="(m, i) in meses" :value="i">{{ m.toUpperCase() }}</option>
                  </select>
                </div>

              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Orgão</label>
                  <input class="form-control" type="text" v-model="fp.orgao" placeholder="orgao">
                </div>

              </div>
              <div class="col">
                <div class="form-group">
                  <label>Nome Servidor</label>
                  <input class="form-control" type="text" v-model="fp.nomeServidor" placeholder="nomeServidor">
                </div>

              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Matricula Siape</label>
                  <input class="form-control" type="text" v-model="fp.matriculaSiape" placeholder="matriculaSiape">
                </div>

              </div>
              <div class="col">
                <div class="form-group">
                  <label>Cargo</label>
                  <input class="form-control" type="text" v-model="fp.cargo" placeholder="cargo">
                </div>

              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>Lotação</label>
                  <input class="form-control" type="text" v-model="fp.lotacao" placeholder="lotacao">
                </div>

              </div>
              <div class="col">

                <div class="form-group">
                  <label>Carga Horária</label>
                  <input class="form-control" type="text" v-model="fp.ch" placeholder="ch">
                </div>
              </div>
            </div>
              <button type="button" class="btn btn-primary" v-on:click="salva">Salvar dados para a proxima</button>
          </div>
      </div>

  </div>
</template>

<script>
export default {
  name: 'Config',
  data () {
    return {
      meses: 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
      fp: {
        ano: null,
        mes: null,
        orgao: null,
        nomeServidor: null,
        matriculaSiape: null,
        cargo: null,
        lotacao: null,
        ch: null,
        uf: 'RO',
        cidade: null,
        outrosFeriados: []
      }
    }
  },
  methods: {
    salva () {
      localStorage.setItem('fp-data', JSON.stringify(this.fp))
    }
  },
  mounted () {
    let fpData = JSON.parse(localStorage.getItem('fp-data'))

    for (var variable in fpData) {
      if (fpData.hasOwnProperty(variable)) {
        this.fp[variable] = fpData[variable]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
