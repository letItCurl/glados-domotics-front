<template>
  <div class="">
    <div class="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <table
        class="min-w-full border-separate"
        style="border-spacing: 0">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="(column, columnMapId) in Object.keys(columnMapping)"
              :key="columnMapId"
              scope="col"
              class="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8">
              {{ this.columnMapping[column].columnName }}
            </th>
          </tr>
        </thead>
        <tbody
          class="bg-white"
          v-if="showDataIf">
          <tr
            v-for="(row, rowIdx) in this.rows"
            :key="row.rowIdx">
            <td
              v-for="(column, columnIdx) in Object.keys(row).filter((column) => Object.keys(columnMapping).includes(column))"
              :key="columnIdx"
              :class="[rowIdx !== this.rows.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8']">

              <span v-if="(columnMapping[column].badge != false)">
                <Badge
                  :color="(columnMapping[column].badge[row[column]]) ? columnMapping[column].badge[row[column]] : defautBadgeColor"
                  :text="row[column]"/>
              </span>
              <span v-else>{{ row[column] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Badge from "../ui/Badge.vue"

export default {
  props: ["rows", "columnMapping", "showDataIf"],
  components: { Badge },
  data() {
    return { defautBadgeColor: "gray" }
  }
}
</script>
