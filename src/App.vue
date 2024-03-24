<script setup>
import { computed, onMounted, ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { useStore } from "vuex";
import TodoTable from "./components/TodoTable.vue";
import TaskCreateForm from "./components/TaskCreateForm.vue";
const url = ref("todo");
const store = useStore();
const data = computed(() => store.getters.getData);
const visible = ref(false);
onMounted(() => {
  store.dispatch("getData", url.value);
});
</script>
<template>
  <div class="max-w-screen-lg mx-auto mt-20">
    <Button
      label="Create Task"
      icon="pi pi-external-link"
      class="dark:text-white"
      @click="visible = true"
    />
    <Dialog
      v-model:visible="visible"
      modal
      header="Create Task"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <TaskCreateForm @closeModel="visible = false" />
    </Dialog>
    <div class="mt-5" v-if="data">
      <TodoTable :data="data" />
    </div>
  </div>
</template>
