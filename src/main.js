import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import ArgonDashboard from "./argon-dashboard";

const appInstance = createApp(App);
const pinia = createPinia();
appInstance.use(store);
appInstance.use(pinia);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
