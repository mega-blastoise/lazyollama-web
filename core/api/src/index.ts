import logger from './log';
import { createRunningBunServer } from './server';

const server = createRunningBunServer();
logger.info('Server running @ %s', server.url);
