Bun.serve({
    port: 3000,
    fetch(request, server) {
        const url = new URL(request.url);
        const pathname = url.pathname;
        switch(pathname) {
            case "/": {
                return new Response('lmdsgen is running', { status: 200 });
            };
            case "/api/model/preheat": {
                /**
                 * Logic here to preload a model
                 */
            }
        }
        return new Response('Hello Bun', { status: 200 });
    },
});