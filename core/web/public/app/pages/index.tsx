import React from 'react';
import { createRoot } from 'react-dom/client';

const mount = document.getElementById('app')!;
const root = createRoot(mount);
console.log(root);
root.render()