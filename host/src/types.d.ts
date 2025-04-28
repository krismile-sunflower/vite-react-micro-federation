declare module 'remote_react/ReactApp' {
  const ReactApp: React.ComponentType;
  export default ReactApp;
}

declare module 'remote_vue/VueApp' {
  const VueApp: React.ComponentType;
  export default VueApp;
}

declare module 'remote_vue/VueAppElement' {
  const VueAppElement: object;
  export default VueAppElement;
}

declare module 'remote_react/HelloWorld' {
  const HelloWorld: React.ComponentType;
  export default HelloWorld;
}

declare namespace JSX {
  interface IntrinsicElements {
    'vue-app-element': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
} 

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vue-app-element': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}