import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Message, Dialog, Loading, MessageBox, Select, Option, Input, Progress } from 'element-ui';

Vue.use(Button);
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Progress);

Vue.use(Loading.directive);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
