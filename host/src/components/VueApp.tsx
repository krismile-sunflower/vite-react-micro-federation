import { useEffect, useRef } from 'react';
import { createApp, defineAsyncComponent, h } from 'vue';

// 创建一个React组件，用于加载Vue组件
const VueComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const vueAppRef = useRef<ReturnType<typeof createApp>>(null);

  useEffect(() => {
    // 确保只在DOM元素存在时创建Vue应用
    if (!containerRef.current) return;

    // 清理之前的Vue实例
    if (vueAppRef.current) {
      vueAppRef.current.unmount();
    }

    const loadVueComponent = async () => {
      try {
        // 异步加载远程Vue组件
        const VueApp = defineAsyncComponent(() => 
          import('remote_vue/VueApp')
        );

        // 创建新的Vue应用实例
        const app = createApp({
          render() {
            // 使用Vue的h函数创建虚拟DOM，而不是JSX
            return h(VueApp);
          }
        });

        // 挂载Vue应用 - 确保containerRef.current不为null
        if (containerRef.current) {          
          app.mount(containerRef.current);
          vueAppRef.current = app;
        }
      } catch (error) {
        console.error('Failed to load Vue component:', error);
      }
    };

    loadVueComponent();

    // 清理函数
    return () => {
      if (vueAppRef.current) {
        vueAppRef.current.unmount();
      }
    };
  }, []);

  return <div ref={containerRef} className="vue-component-container"></div>;
};

export default VueComponent;