import { pipeline } from '@lmdsgen/typescript-common';
import { middleware } from '../middleware';

export function handleMethodNotAllowed(request: Request): Response {
  return new Response('Method Not Allowed', { status: 405 });
}

export type HTTPMethodKey = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';
export type HTTPMethodHandler = (request: Request) => Response | Promise<Response>;
export type ResponseHandlerObject = Record<HTTPMethodKey, HTTPMethodHandler>;

export function createHTTPMethodHandlerObject(
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
