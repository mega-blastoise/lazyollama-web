import { createLogger } from '@lazyollama/typescript-common';

function middleware(request: Request): void {
    const logger = createLogger('lazyollama:core:web:middleware');
    const url = new URL(request.url);
    logger.info('%s %s', request.method, url.pathname);
}

export default middleware;