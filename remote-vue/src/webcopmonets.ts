// remote-vue/src/main-webcomponent.ts
import { defineCustomElement } from 'vue'
import App from './App.vue'

// 包装成 Web Component
const AppElement = defineCustomElement(App)

// 注册为自定义元素（如 <vue-app-element />）
customElements.define('vue-app-element', AppElement)