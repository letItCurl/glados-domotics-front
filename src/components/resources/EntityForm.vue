<template>
  <div class="space-y-6 sm:space-y-5">
    <div class="space-y-6 sm:space-y-5">
      <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
        <label
          for="name"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Name</label>
        <div class="mt-1 sm:col-span-2 sm:mt-0">
          <input
            type="text"
            name="name"
            id="name"
            v-model="editedEntity.name"
            class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"/>
        </div>
      </div>

      <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
        <label
          for="type"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Type</label>
        <div class="mt-1 sm:col-span-2 sm:mt-0">
          <select
            id="type"
            name="type"
            class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm">
            <option
              v-for="(status, id) in statuses"
              :key="id">{{ status }}</option>
          </select>
        </div>
      </div>


      <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
        <label
          for="status"
          class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Status</label>
        <div class="sm:mt-px sm:pt-2 sm:col-span-2 flex items-center space-x-3">
          <div class="flex items-center">
            <input
              id="status-on"
              name="status"
              type="radio"
              value="on"
              v-model="editedEntity.status"
              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label
              for="status-on"
              class="ml-3 block text-sm font-medium text-gray-700">On</label>
          </div>
          <div class="flex items-center">
            <input
              id="status-off"
              name="status"
              type="radio"
              value="off"
              v-model="editedEntity.status"
              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label
              for="status-off"
              class="ml-3 block text-sm font-medium text-gray-700">Off</label>
          </div>
        </div>
      </div>

      <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-5">
        <label for="number" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Value</label>
        <div class="mt-1 sm:col-span-2 sm:mt-0">
          <input
            type="number"
            name="value"
            id="number"
            v-model="editedEntity.value"
            class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm" />
        </div>
      </div>
    </div>
    <div class="pt-5">
      <div class="flex justify-end">
        <button
          type="submit"
          class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: [ "entity" ],
  data() {
    return {
      editedEntity: {},
      statuses: [
        "sensor",
        "light",
        "switch",
        "multimedia",
        "air_conditioner"
      ]
    }
  },
  created() {
    this.editedEntity = {...this.entity}
  }
}
</script>
