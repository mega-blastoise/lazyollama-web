import {
  type ServeOptions,
  type RouterTypes,
  type Server
} from "bun";

type BunServerConfig<R = { [k: string]: RouterTypes.RouteValue<string> }> =
  Omit<ServeOptions, "fetch"> & {
    fetch: (
      this: Server,
      request: Request,
      server: Server
    ) => Response | Promise<Response>;
    routes: R;
  } & {
    /**
     * @deprecated Use `routes` instead in new code. This will continue to work for awhile though.
     */
    static?: R;
  };

function getBunServerConfig(): BunServerConfig {
  return {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    routes: {
      "/": new Response("Hello from lmdsgen", { status: 200 }),
    },
    fetch(request, server) {
      /**
       *
       */
      return new Response("Not found", { status: 404 });
    },
  };
}

export default getBunServerConfig;
