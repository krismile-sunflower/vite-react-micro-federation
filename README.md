# Vite Micro Federation

这是一个基于 Vite 和 Module Federation 构建的微前端项目，用于展示如何将 React 和 Vue 应用集成到同一个微前端系统中。

## 项目结构

项目采用 monorepo 结构，包含以下子项目：

- **host**: 主应用，基于 React 构建
- **remote-react**: React 远程组件
- **remote-vue**: Vue 远程组件

## 技术栈

- **构建工具**: Vite
- **模块联邦**: @originjs/vite-plugin-federation
- **前端框架**: 
  - React (host 和 remote-react)
  - Vue (remote-vue)
- **包管理器**: pnpm

## 功能特点

- 基于 Module Federation 的微前端架构
- 共享依赖，避免重复加载
- 独立开发和部署能力

## 快速开始

### 安装依赖

```bash
# 安装所有子项目依赖
pnpm install:deps
```

### 开发模式

```bash
# 启动所有子项目的开发服务器
pnpm dev
```

这将启动以下服务：
- Host 应用: http://localhost:3000
- Vue 远程应用: http://localhost:3001
- React 远程应用: http://localhost:3002

### 构建项目

```bash
# 构建所有子项目
pnpm build
```

### 一键启动（构建+开发模式）

```bash
# 构建所有项目并启动开发服务器
pnpm start
```

## 项目配置

每个子项目都有自己的 `vite.config.ts` 文件：

- Host 应用配置了远程模块的加载路径
- 远程组件配置了需要暴露的模块和共享依赖

## 开发指南

### 添加新的远程组件

1. 创建新的子项目目录
2. 配置 vite.config.ts 文件以暴露组件
3. 在 host 应用的 vite.config.ts 中添加新的远程模块

### 远程组件传参示例

在 Module Federation 中使用 TypeScript 时，需要注意远程组件的类型定义问题。以下是一个完整示例：

#### 远程组件定义 (remote-react/src/components/HelloWorld.tsx)

```tsx
import { useState } from "react";

type Props = {
    title: string;
    onClick: (n: number) => void;
}

export default function HelloWorld({ title, onClick }: Props) {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>{title}</h1>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <br />
            <button onClick={() => onClick(count)}>点击我</button>
            <p>Count: {count}</p>
        </div>
    )
}
```

#### 远程组件暴露 (remote-react/vite.config.ts)

```ts
// ...其他配置
federation({
  name: "remote_react",
  filename: "remoteEntry.js",
  exposes: {
    "./ReactApp": "./src/App.tsx",
    "./HelloWorld": "./src/components/HelloWorld.tsx",
  },
  shared: ["react", "react-dom"],
})
```

#### 主应用中使用并传参 (host/src/App.tsx)

```tsx
// 定义远程组件的类型
type Props = {
  title: string;
  onClick: (n: number) => void;
}

function App() {
  // 使用类型断言解决TypeScript错误
  const HelloWorld = lazy(() => import('remote_react/HelloWorld')) as unknown as React.ComponentType<Props>;
  
  return (
    <div>
      <h2>Hello World</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <HelloWorld 
          title="HELLO WORLD TO REACT" 
          onClick={(num) => { console.log("clicked", num) }} 
        />
      </Suspense>
    </div>
  )
}
```

### 调试技巧

- 各个应用可以独立开发和测试
- 修改共享依赖需要重新构建所有项目

## 部署说明

在生产环境中，您需要：

1. 构建所有子项目 (`pnpm build`)
2. 将各个子项目的构建产物部署到对应的服务器/CDN
3. 确保 host 应用中的远程模块路径指向正确的生产环境 URL

## 常见问题

### 远程模块加载失败

- 检查远程应用是否正常启动
- 验证远程应用的暴露模块是否正确
- 确认 host 应用中配置的远程模块路径是否正确

### 共享依赖版本冲突

- 确保所有子项目使用兼容版本的共享依赖
- 在 module federation 配置中指定明确的共享版本范围

### TypeScript 类型问题

- 当使用 TypeScript 时，远程组件的类型信息不会自动传递给主应用
- 需要在主应用中手动定义与远程组件匹配的类型
- 使用类型断言 `as unknown as React.ComponentType<Props>` 来解决类型错误

### 样式问题
- 样式时，由于样式冲突，样式可能无法正确加载。
- 解决方案：
 - 使用 CSS 模块化，避免样式冲突
 - css in js
 - css 原子化
