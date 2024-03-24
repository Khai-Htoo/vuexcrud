<script setup>
import Toast from "primevue/toast";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import { ref } from "vue";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
const url = ref("todo");
const title = ref("");
const description = ref("");
const store = useStore();
const emit = defineEmits();
const toast = useToast();
const handleSubmit = () => {
  const data = {
    url: url.value,
    formData: {
      title: title.value,
      description: description.value,
      status: "pending",
    },
  };
  store.dispatch("storeData", data);
  emit("closeModel");
  toast.add({
    severity: "success",
    summary: "Well Done",
    detail: "Task Successfully Created",
    life: 3000,
  });
};
</script>
<template>
  <div>
    <Toast />
    <form @submit.prevent="handleSubmit">
      <div class="">
        <label for="">Title</label> <br />
        <InputText type="text" class="w-full mt-2" v-model="title" />
      </div>
      <div class="my-3">
        <label for="">Description</label> <br />
        <Textarea
          v-model="description"
          rows="5"
          cols="30"
          class="w-full mt-2"
        />
      </div>
      <Button label="Submit" type="submit" class="w-full" />
    </form>
  </div>
</template>
