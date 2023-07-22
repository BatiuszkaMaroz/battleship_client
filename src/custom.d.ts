declare namespace NodeJS {
  interface ProcessEnv {
    readonly SOCKET_ENDPOINT: 'development' | 'production' | 'test';
  }
}

interface Window {
  // eslint-disable-next-line @typescript-eslint/ban-types
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function;
}

/* ============================================================ */

declare module '*.avif' {
  const content: string;
  export default content;
}

declare module '*.bmp' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

/* ============================================================ */

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

/* ============================================================ */

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
