import { RouterTypes } from 'bun';
import { pipeline } from '@lmdsgen/typescript-common';
import { middleware } from '../middleware';

function handleMethodNotAllowed(request: Request): Response {
  return new Response('Method Not Allowed', { status: 405 });
}

type HTTPMethodKey = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';
type HTTPMethodHandler = (request: Request) => Response | Promise<Response>;
type ResponseHandlerObject = Record<HTTPMethodKey, HTTPMethodHandler>;

function createHTTPMethodHandlerObject(
  handlers: Partial<ResponseHandlerObject>
): ResponseHandlerObject {
  return {
    GET: pipeline<Request, Response>(middleware as any, handleMethodNotAllowed as any),
    POST: pipeline<Request, Response>(middleware as any, handleMethodNotAllowed as any),
    PUT: pipeline<Request, Response>(middleware as any, handleMethodNotAllowed as any),
    DELETE: pipeline<Request, Response>(middleware as any, handleMethodNotAllowed as any),
    PATCH: pipeline<Request, Response>(middleware as any, handleMethodNotAllowed as any),
    OPTIONS: pipeline<Request, Response>(middleware as any, handleMethodNotAllowed as any),
    ...handlers
  };
}

function handleGETAPIStatusRequest(r: Request | Response): Response {
  if (r instanceof Response) return r;
  else return new Response('OK', { status: 200 });
}

export function getApiServerRoutes(): {
  [k: string]: RouterTypes.RouteValue<string>;
} {
  return {
    '/api/status': createHTTPMethodHandlerObject({
      GET: pipeline<Request, Response>(middleware as any, handleGETAPIStatusRequest as any)
    })
  };
}

export default getApiServerRoutes;
