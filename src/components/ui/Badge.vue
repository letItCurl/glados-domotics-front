<template>
  <span :class="`inline-flex items-center rounded-full bg-${color}-100 px-2.5 py-0.5 text-xs font-medium text-${color}-800`">{{ text }}</span>
</template>

<script>
export default {
  props: {
    text: String,
    color: String
  }
}
</script>
