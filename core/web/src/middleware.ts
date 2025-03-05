import { createLogger } from '@lazyrepo/typescript-common';

function middleware(request: Request): void {
    const logger = createLogger('lazyrepo:core:web:middleware');
    const url = new URL(request.url);
    logger.info('%s %s', request.method, url.pathname);
}

export default middleware;