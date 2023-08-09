<script setup>
defineProps({
  title: String,
  subtitle: String,
});
</script>

<template>
  <div
    class="w-full rounded-xl bg-gradient-linear bg-gradient-to-[#E6E7E8] bg-gradient-from-[#FFFFFF] flex flex-col py-24 justify-center items-center shadow"
  >
    <h3 class="-mb-2">{{ title }}</h3>
    <h3 class="font-900">{{ subtitle }}</h3>
    <logo-dots />
  </div>
</template>
