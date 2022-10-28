<template>
  <div class="flex flex-col gap-5">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-indigo-600">Dashboard</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the entities in your house.</p>
      </div>
    </div>
    <Table
      :rows="getEntities"
      :column-mapping="columnMapping"
      :show-data-if="getIsError == false"
      @row-clicked="handleRowClicked"
      v-if="getIsLoading == false">
    </Table>
    <div class="mx-auto mt-3">
      <Spinner
        v-if="getIsLoading == true"/>
    </div>
    <SlideOver
      :open="slideOverIsOpen"
      @close="onClose"
      title="Edit entity"
      v-if="getIsLoading == false">
      <EntityForm :entity="entityToEdit"/>
    </SlideOver>
  </div>
</template>

<script>
import Table from "../ui/Table.vue"
import Spinner from "../ui/Spinner.vue"
import SlideOver from "../ui/SlideOver.vue"
import EntityForm from "../resources/EntityForm.vue"

import { mapActions, mapGetters } from "vuex"

export default {
  name: "Dashboard",
  components: {
    Table,
    Spinner,
    SlideOver,
    EntityForm
  },
  created() {
    this.fetchEntities
  },
  data() {
    return {
      entities: [],
      entityToEdit: {},
      slideOverIsOpen: false,
      columnMapping: {
        "name": {
          "columnName": "Name",
          badge: false
        },
        "type": {
          "columnName": "Type",
          badge: false
        },
        "status": {
          "columnName": "Status",
          badge: {
            on: "green",
            off: "red"
          }
        },
        "value": {
          "columnName": "Value",
          badge: false
        },
        "created_at": {
          "columnName": "Created at",
          badge: false
        }
      }
    }
  },
  methods: {
    handleRowClicked(row) {
      this.entityToEdit = row
      this.slideOverIsOpen = true
    },
    onClose() {
      this.entityToEdit = {}
      this.slideOverIsOpen = false
    }
  },
  computed: {
    ...mapGetters([
      "getEntities",
      "getIsLoading",
      "getIsError"
    ]),
    ...mapActions([
      "fetchEntities"
    ])
  }
}
</script>
