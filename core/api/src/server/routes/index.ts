import { RouterTypes } from 'bun';
import { pipeline } from '@lmdsgen/typescript-common';

import { middleware } from '../middleware';
import { createHTTPMethodHandlerObject } from './base';
import { handleGETAPIStatusRequest } from './api-status';

type APIRoutes = {
  [k: string]: RouterTypes.RouteValue<string>;
};

export function getApiServerRoutes(): APIRoutes {
  return {
    '/api/status': createHTTPMethodHandlerObject({
      GET: pipeline<Request, Response>(middleware as any, handleGETAPIStatusRequest as any)
    }),
    '/api/rpc/controller': createHTTPMethodHandlerObject({
      POST: pipeline<Request, Response>(
        middleware as any,
        () => new Response('Not implemented')
      )
    })
  };
}

export default getApiServerRoutes;
