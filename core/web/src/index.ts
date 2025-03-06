import { createLogger } from '@lazyollama-web/typescript-common';
import createRunningBunServer from './server';
const server = createRunningBunServer();
createLogger('lazyollama:core:web:server').info(
  'Started! Listening @ ',
  'http://' + server.hostname + ':' + server.port + '/'
);
