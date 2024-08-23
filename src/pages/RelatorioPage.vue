<template>
  <q-page class="row items-center justify-evenly">
    <q-card
      class="my-card"
      flat
      bordered
    >
      <q-item

      >
        <q-item-section>
          <q-item-label caption>
            Relatório das Vendas Efetuadas
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section
        class="text-center"
        horizontal
      >
        <q-card-section class="col-6">
          <q-btn
            label="PDF"
            @click="relpdf()"
          />
        </q-card-section>
        <q-separator vertical />
        <q-card-section class="col-6">
          <q-btn
            label="EXCEL"
            @click="relexcel()"
          />
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from "vue-router"
import { api } from 'boot/axios'
import { openURL } from 'quasar'

export default defineComponent({
  name: 'RelatorioPage',

  setup () {

    const router = useRouter();

    const relpdf = async () => {
      console.log('Gerar PDF')

      const url = '/api/v1/vendas_efetuadas_pdf/'

      api.get(url)
        .then(
          (response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "nota_fiscal_vendas.pdf");
            document.body.appendChild(link);
            link.click();
          }
        )
    }

    const relexcel = () => {
      console.log('Gerar EXCEL')

      const url = '/api/v1/vendas_efetuadas_excel/'

      api.get(url, { responseType: 'blob' })
        .then(
          (response) => {
            const url = URL.createObjectURL(new Blob([response.data], {
              type: 'application/vnd.ms-excel'
            }))
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "nota_fiscal_vendas.xlsx");
            document.body.appendChild(link);
            link.click();
          }
        )
    }

    return {
      relpdf,
      relexcel
    }
  }
})
</script>
