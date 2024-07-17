<script setup lang="ts">
// Define props for components
defineProps<{ message: string; status: boolean }>();

defineEmits(["close"]);
</script>

<template>
  <!-- Modal -->
  <dialog class="modal text-black">
    <div class="modal-box">
      <form method="dialog">
        <button @click="$emit('close')" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="text-lg font-bold">{{ message }}</h3>
    </div>
  </dialog>
</template>
