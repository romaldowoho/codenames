import {  createApp } from 'vue'
import App from './App.vue'
import  router  from './router/index'
import store from './store/index'
import io from './plugins/socketio'


const app = createApp(App)
app.use(io, {
    connection: 'http://localhost:3000'
})
app.use(router)
app.use(store)
app.mount('#app')