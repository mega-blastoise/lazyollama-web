// import '@lazyollama-web/typescript-react-components/out/lib/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { LazyOllamaWebThemeProvider } from '@lazyollama-web/typescript-react-components';

function withProviders(Component: React.ReactNode): React.ReactNode {
  return <LazyOllamaWebThemeProvider>{Component}</LazyOllamaWebThemeProvider>;
}

export function renderComponentToDom<P extends React.JSX.IntrinsicAttributes = {}>(
  Component: React.FC,
  props: P = {} as P,
  target: HTMLElement = document.getElementById('app')!
) {
  let root = createRoot(target);
  /** Attach root to FiberWatcher */
  root.render(withProviders(<Component {...props} />));
  console.log(root);
}
