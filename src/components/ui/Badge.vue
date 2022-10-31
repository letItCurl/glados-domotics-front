<template>
  <span :class="`inline-flex items-center rounded-full bg-${color}-100 px-2.5 py-0.5 text-xs font-medium text-${color}-800`">{{ text }}</span>
  <span class="bg-green-100 bg-red-100 bg-gray-100 text-gray-800 text-green-800 text-red-800 hidden"></span>
</template>

<script>
// @NOTE:
// L3 ensure that every class is corectly loaded by tailwind.
// This an quick hack, but a long term solution needs to be found.
export default {
  props: {
    text: String,
    color: String
  }
}
</script>
