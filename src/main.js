import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index.js";
// import router from "./router.js";

import BaseSpinner from "./components/ui/base/BaseSpinner.vue";
import BaseMessage from "./components/ui/base/BaseMessage.vue";

const app = createApp(App);

app.component("base-spinner", BaseSpinner);
app.component("base-message", BaseMessage);

app.use(store);
app.mount("#app");
