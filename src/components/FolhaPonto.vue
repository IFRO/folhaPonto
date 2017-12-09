<template>
  <div class="folha-ponto">
    <div v-for="(page, i) in chunks">
      <FolhaPontoCabecalho />

        <h3>FOLHA DE PONTO {{ i + 1 }}a QUINZENA</h3>
        <table class="table table-bordered table-sm">
            <tr>
                <td>
                    Órgão ou Entidade
                </td>
                <td colspan="5">
                    {{ fp.orgao }}
                </td>
            </tr>
            <tr>
                <td>
                    Mês
                </td>
                <td>
                    {{ mesAtual.toUpperCase() }}
                </td>
                <td>
                    Ano
                </td>
                <td colspan="3">
                    {{ fp.ano }}
                </td>
            </tr>
            <tr>
                <td>
                    Servidor
                </td>
                <td colspan="3">
                    {{ fp.nomeServidor }}
                </td>
                <td>
                    Matícula
                </td>
                <td>
                    {{ fp.matriculaSiape }}
                </td>
            </tr>
            <tr>
                <td>
                    Cargo
                </td>
                <td>
                    {{ fp.cargo }}
                </td>
                <td>
                    Lotação
                </td>
                <td>
                    {{ fp.lotacao }}
                </td>
                <td>
                    C. Horária
                </td>
                <td>
                    {{ fp.ch }}
                </td>
            </tr>
        </table>
        <h4>Somatório de horas de:</h4>

        <table class="table table-sm">
            <tr>
                <td>- Atrasos e Saídas Antecipadas</td>
                <td style="width: 30%">___:___</td>
                <td>- Licenças</td>
                <td style="width: 30%">___:___</td>
            </tr>
            <tr>
                <td>- Faltas injustificadas</td>
                <td>___:___</td>
                <td>- Faltasjustificadas</td>
                <td>___:___</td>
            </tr>
            <tr>
                <td>- Frequência</td>
                <td>___:___</td>
                <td></td>
                <td></td>
            </tr>
        </table>

        <table class="table table-bordered table-stripped table-sm table-h" style="margin-top: 15px">
            <thead>
                <tr>
                    <th>Dia</th>
                    <th>Hora Entrada</th>
                    <th>Hora Saída</th>
                    <th>Hora Entrada</th>
                    <th>Hora Saída</th>
                    <th>Rubrica Servidor</th>
                    <th>Ocor.</th>
                    <th>Abono C. Imed.</th>
                    <th>Hrs. Trab.</th>
                    <th>Comp.</th>
                    <th>Hora Extra</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in page">
                  <td>{{i.getDate()}}</td>
                  <!-- <template v-if="Feriado(i).ehFeriado"> -->
                  <template v-if="true">
                      <td colspan="4">
                        <!-- {{ Feriado(i).qual }} -->
                      </td>
                  </template>
                  <template v-else>
                      <td v-for="n in 4">
                        <!-- {{SabOuDom(i.getDay())}} -->
                      </td>
                  </template>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>___:___</td>
                </tr>
            </tbody>
        </table>
        <p>OBS: A folha de ponto deverá ser encaminhada à Diretoria de Gestão de Pessoas até o 5o dia útil do mês subsequente.</p>
        <div class="clearfix">
            <p class="float-left">Data: ___/___/___</p>
            <p class="float-right">Assinatura do Servidor:____________________________________________________ </p>
        </div>

        <p class="text-right">Visto do Chefe imediato:____________________________________________________</p>
        <p>
            Observações:
            <p style="border-bottom: 1px solid black; margin-top: 10px">&nbsp;</p>
            <p style="border-bottom: 1px solid black; margin-top: 10px">&nbsp;</p>
            <p style="border-bottom: 1px solid black; margin-top: 10px">&nbsp;</p>
        </p>
    </div>
  </div>
</template>

<script>
import FolhaPontoCabecalho from './FolhaPontoCabecalho'
import _ from 'lodash'

export default {
  name: 'FolhaPonto',
  components: { FolhaPontoCabecalho },
  data () {
    return {
      meses: 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
      monthDays: [],
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
  computed: {
    mesAtual() {
        return this.meses[this.fp.mes];
    },
    chunks () {
      return _.chunk(this.monthDays, Math.ceil(this.monthDays.length / 2))
    }
  },
  mounted () {
    let fpData = JSON.parse(localStorage.getItem('fp-data'))

    for (var variable in fpData) {
      if (fpData.hasOwnProperty(variable)) {
        this.fp[variable] = fpData[variable]
      }
    }

    this.monthDays.splice(0)
    // while(this.monthDays.length > 0) {this.monthDays.pop();}
    this.date = new Date(this.fp.ano, this.fp.mes, 1)

    while (this.date.getMonth() === this.fp.mes) { // this.currentDate.getMonth()
      console.log(this.date.getMonth(), this.fp.mes)
      this.monthDays.push(new Date(this.date.getTime()))
      this.date.setDate(this.date.getDate() + 1)
    }

    console.log('chukxs', this.chunks)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
