<script setup>
defineProps({
  title: String,
  subtitle: String,
});
</script>

<template>
  <div
    class="w-full rounded-xl py-12 bg-gradient-linear bg-gradient-to-[#E6E7E8] bg-gradient-from-[#FFFFFF] flex flex-col justify-center items-center shadow lg:py-24"
  >
    <h3 class="-mb-2">{{ title }}</h3>
    <h3 class="font-900">{{ subtitle }}</h3>
    <logo-dots />
  </div>
</template>
