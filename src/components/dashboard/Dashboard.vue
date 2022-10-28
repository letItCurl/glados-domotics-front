<template>
  <div class="flex flex-col gap-5">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-indigo-600">Dashboard</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all the entities in your house.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
          @TODO_CURRENT_PR: Needed ?
        </button>
      </div>
    </div>
    <Table
      :rows="getEntities"
      :column-mapping="columnMapping"
      :show-data-if="getIsError == false"
      v-if="getIsLoading == false">
    </Table>
    <div class="mx-auto mt-3">
      <Spinner v-if="getIsLoading == true"/>
    </div>
  </div>
</template>

<script>
import Table from "../ui/Table.vue"
import Spinner from "../ui/Spinner.vue"

import { mapActions, mapGetters } from "vuex"

export default {
  name: "Dashboard",
  components: { Table, Spinner },
  created() {
    this.fetchEntities
  },
  data() {
    return {
      entities: [],
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
