import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createApp } from 'vue';

// 将Vue、React和ReactDOM暴露给全局，以便远程组件可以使用
Object.defineProperty(window, 'Vue', {
  value: { createApp },
  writable: false,
  configurable: false,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
