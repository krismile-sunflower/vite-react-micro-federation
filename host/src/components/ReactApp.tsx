import { lazy, useEffect, useRef, Suspense } from 'react';
import { createRoot, Root } from 'react-dom/client';

// 创建一个React组件，用于加载React组件
const ReactComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<Root>(null);

  useEffect(() => {
    // 确保只在DOM元素存在时创建React应用
    if (!containerRef.current) return;

    // 清理之前的React实例
    if (rootRef.current) {
      rootRef.current.unmount();
    }

    const loadReactComponent = async () => {
      try {
        // 创建新的React应用实例 - containerRef.current 已在上面检查过非空
        const root = createRoot(containerRef.current!);
        rootRef.current = root;

        // 异步加载远程React组件
        const RemoteReactApp = lazy(() => 
          import('remote_react/ReactApp')
        );

        // 挂载React应用
        root.render(
          <Suspense fallback={<div>Loading React app...</div>}>
            <RemoteReactApp />
          </Suspense>
        );
      } catch (error) {
        console.error('Failed to load React component:', error);
      }
    };

    loadReactComponent();

    // 清理函数
    return () => {
      if (rootRef.current) {
        rootRef.current.unmount();
      }
    };
  }, []);

  return <div ref={containerRef} className="React-component-container"></div>;
};

export default ReactComponent;