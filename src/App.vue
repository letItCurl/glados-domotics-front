<template>
  <div class="bg-stone-100 p-5 min-h-screen flex flex-col">
    <router-view class="flex-1" />
    <Notification
      v-if="getIsError == true"
      text="An error ocurred, please contact the suport."/>
  </div>
</template>
<script>
// @NOTE:
// On L6, a more specefic explanation could be done by rendering server error.
// Validation errors, etc
import Notification from "./components/ui/Notification.vue"
import { mapGetters } from "vuex"

export default {
  name: "Dashboard",
  components: { Notification, },

  computed: {
    ...mapGetters([
      "getIsError"
    ])
  }
}
</script>
