import { lazy, Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VueComponent from './components/VueApp'

type Props = {
  title: string;
  onClick: (n: number) => void;
}

function App() {
  const [count, setCount] = useState(0)

  
  const ReactApp = lazy(() => import('remote_react/ReactApp'));
  const HelloWorld = lazy(() => import('remote_react/HelloWorld')) as unknown as React.ComponentType<Props>;

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div>
        <h2>Vue App</h2>
        <VueComponent />
        {/* <VueApp /> */}

        <h2>React App</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <ReactApp />
        </Suspense>
      </div>

      <div>
        <h2>Hello World</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <HelloWorld title="HELLO WORLD TO REACT1" onClick={(num) => { console.log("clicked", num) }} />
        </Suspense>
      </div>
    </>
  )
}

export default App
