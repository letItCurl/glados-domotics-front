<template>
  <div class="flex flex-col gap-5">
    <span class="text-indigo-600 font-bold text-2xl">Dashboard</span>
    <Table
      :rows="getEntities"
      :columnMapping="columnMapping"
      v-if="(getIsLoading == false) && (getIsError == false)">
    </Table>
  </div>
</template>

<script>
import Table from "../ui/Table.vue"
import { mapGetters, mapActions } from "vuex"

export default {
  name: "Dashboard",
  components: {
    Table,
  },
  created() {
    this.fetchEntities
  },
  data() {
    return {
      entities: [],
      columnMapping: {
        "name": { "columnName": "Name", badge: false },
        "type": { "columnName": "Type", badge: false },
        "status": { "columnName": "Status", badge: { on: "green", off: "red" } },
        "value": { "columnName": "Value", badge: false },
        "created_at": { "columnName":"Created at", badge: false }
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
