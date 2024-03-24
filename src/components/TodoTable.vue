<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import { ref } from "vue";
import Button from "primevue/button";
import { useStore } from "vuex";
const props = defineProps(["data"]);
const store = useStore();
const statuses = [
  { label: "Pending", value: "pending" },
  { label: "Complete", value: "completed" },
];
const editingRows = ref([]);

const getStatusLabel = (status) => {
  switch (status) {
    case "pending":
      return "warning";

    case "completed":
      return "success";

    default:
      return null;
  }
};

const onRowEditSave = (event) => {
  const { newData } = event;
  const data = {
    url: "todo",
    formData: newData,
  };
  store.dispatch("updateData", data);
};
</script>
<template>
  <div>
    <DataTable
      :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem"
      paginator
      :rows="5"
      v-model:editingRows="editingRows"
      :value="props.data"
      editMode="row"
      dataKey="id"
      @row-edit-save="onRowEditSave"
      :pt="{
        table: { style: 'min-width: 50rem' },
      }"
    >
      <template #paginatorstart>
        <Button type="button" icon="pi pi-refresh" text />
      </template>
      <template #paginatorend>
        <Button type="button" icon="pi pi-download" text />
      </template>
      <Column field="title" header="Title" style="width: 25%">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>

      <Column field="description" header="Description" style="width: 40%">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" />
        </template>
      </Column>

      <Column field="status" header="Status" style="width: 20%">
        <template #editor="{ data, field }">
          <Dropdown
            v-model="data[field]"
            :options="statuses"
            optionLabel="label"
            optionValue="value"
            placeholder="Select a Status"
          >
            <template #option="slotProps">
              <Tag
                :value="slotProps.option.value"
                :severity="getStatusLabel(slotProps.option.value)"
              />
            </template>
          </Dropdown>
        </template>
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.status"
            :severity="getStatusLabel(slotProps.data.status)"
          />
        </template>
      </Column>

      <Column
        :rowEditor="true"
        style="width: 7%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></Column>
    </DataTable>
  </div>
</template>
