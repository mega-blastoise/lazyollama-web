import { createLogger } from '@lazyrepo/typescript-common';
import createRunningBunServer from './server';
const server = createRunningBunServer();
createLogger('lazyrepo:core:web:server').info('Started! Listening @ ', 'http://' + server.hostname + ':' + server.port + '/')