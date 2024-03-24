import "./style.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import PrimeVue from "primevue/config";
import lara from "./presets/lara";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";
const app = createApp(App);
app.use(router);
app.use(store);
app.use(PrimeVue, {
  unstyled: true,
  pt: lara,
});
app.use(ToastService);
app.mount("#app");
