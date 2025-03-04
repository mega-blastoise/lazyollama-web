import { Ollama as LazyOllama } from '@lmdsgen/typescript-clients';

import logger from './log';
import { createRunningBunServer } from './server';

/**
 * Populate the model cache with running models
 */
await LazyOllama.getInstance().indexRunningModels();

const server = createRunningBunServer();
logger.info('Server running @ %s', server.url);
