<template>
  <div class="folha-ponto">
    <router-link :to="{ name: 'Config', params: {} }" class="btn btn-sm d-print-none">Voltar</router-link>
    <div v-for="(page, i) in chunks">
      <FolhaPontoCabecalho />

      <h5>FOLHA DE PONTO {{ i + 1 }}a QUINZENA</h5>
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
      <strong>Somatório de horas de:</strong>

      <table class="table table-sm table-fsm">
        <tr>
          <td>- Atrasos e Saídas Antecipadas</td>
          <td>___:___</td>
          <td>- Licenças</td>
          <td>___:___</td>
        </tr>
        <tr>
          <td>- Faltas injustificadas</td>
          <td>___:___</td>
          <td>- Faltas justificadas</td>
          <td>___:___</td>
        </tr>
        <tr>
          <td>- Frequência</td>
          <td>___:___</td>
          <td></td>
          <td></td>
        </tr>
      </table>

      <table class="table table-bordered table-stripped table-sm table-h table-fsm" style="margin-top: 15px">
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
            <template v-if="feriado(i).ehFeriado">
              <td colspan="4">
                {{ feriado(i).qual }}
              </td>
            </template>
            <template v-else>
              <td v-for="n in 4">
                {{ ehSabOuDom(i.getDay()) }}
              </td>
            </template>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>:</td>
          </tr>
        </tbody>
      </table>
      <p><small>OBS: A folha de ponto deverá ser encaminhada à Diretoria de Gestão de Pessoas até o 5o dia útil do mês subsequente.</small></p>
      <div class="clearfix">
        <p class="float-left">Data: ___/___/___</p>
        <p class="float-right">Assinatura do Servidor:____________________________________________________ </p>
      </div>

      <p class="text-right">Visto do Chefe imediato:____________________________________________________</p>
      <p>Observações:</p>
      <p style="border-bottom: 1px solid black; margin-top: 6px">&nbsp;</p>
      <p style="border-bottom: 1px solid black; margin-top: 6px">&nbsp;</p>
      <p style="border-bottom: 1px solid black; margin-top: 6px">&nbsp;</p>
      <div class="page-break" v-if="i===0"></div>
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
      feriados: [],
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
    mesAtual () {
      return this.meses[this.fp.mes]
    },
    chunks () {
      return _.chunk(this.monthDays, Math.ceil(this.monthDays.length / 2))
    }
  },
  methods: {
    feriado (date) {
      var day = date.getDate()
      var month = date.getMonth() + 1
      var k = day + '/' + month
      if (typeof this.feriados[k] === 'undefined') {
        return { ehFeriado: false }
      } else {
        return { ehFeriado: true, qual: this.feriados[k] }
      }
    },
    ehSabOuDom (day) {
      if (day === 0) {
        return 'DOM'
      } else if (day === 6) {
        return 'SÁB'
      } else {
        return ':'
      }
    }
  },
  mounted () {
    let fpData = JSON.parse(localStorage.getItem('fp-data'))
    let feriados = JSON.parse(localStorage.getItem('app-feriados'))
    let meusFeriados = JSON.parse(localStorage.getItem('meus-feriados'))

    for (var variable in fpData) {
      if (fpData.hasOwnProperty(variable)) {
        this.fp[variable] = fpData[variable]
      }
    }

    feriados.forEach((f) => {
      let fdate = f.date

      // {
      //     "date": "",
      //     "title": "Sexta-Feira da Paixão",
      //     "description": "Data cristã na qual a morte de Cristo é lembrada.",
      //     "legislation": "Lei nº 9.093, de 12 de setembro de 1995 - http://www.planalto.gov.br/ccivil_03/Leis/L9093.htm",
      //     "type": "Feriado Nacional",
      //     "startTime": "",
      //     "endTime": "",
      //     "computedDate": {"month":3, "weekday": 5, "skip": 1},
      //     "country": "Brasil"
      // },
      // if (_.isEmpty(f.date) && _.isObject(f.computedDate)) {
      //   let date = new Date(this.fp.ano, f.computedDate.month, 1)
      //
      //   let skip = 0
      //   let found = false
      //
      //   while (!found) {
      //     console.log(date.getDay() === f.computedDate.weekday, date.getDay(), f.computedDate.weekday)
      //     if (date.getDay() === f.computedDate.weekday) {
      //       skip++
      //     }
      //     if (skip <= f.computedDate.skip || date.getMonth() > f.computedDate.month) {
      //       date.setDate(date.getDate() + 1)
      //     } else {
      //       found = true
      //     }
      //   }
      //   console.log(date)
      //   fdate = date.getDate() + '/' + date.getMonth()
      // }
      this.feriados[fdate] = f.title
    })

    Object.assign(this.feriados, meusFeriados)

    this.monthDays.splice(0)
    // while(this.monthDays.length > 0) {this.monthDays.pop()}
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

<!-- Add 'scoped" attribute to limit CSS to this component only -->
<style scoped>
@media print {
  body, table { font-size: 0.85rem }
  .page-break {page-break-after: always;}
  /*table.table-fsm { font-size: 0.8rem }*/
}
</style>
