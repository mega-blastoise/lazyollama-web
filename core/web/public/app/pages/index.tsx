import '@lazyollama-web/typescript-react-components/main.css';
import React from 'react';
import { renderComponentToDom  } from '../lib/mount';
import { Home } from '../components/home';

renderComponentToDom(Home);
