import { Timer } from 'sleepydogs';
import { Ollama as LazyOllama, OllamaClientCacheType } from '@lmdsgen/typescript-clients';

type RPCAPIResponse<T> = {
  requested_method: keyof RPCController;
  request_timestamp?: number;
  request_accepted?: boolean;
  response_data?: T;
  response_timestamp?: number;
  response_time_ms?: number;
};

class RPCController {
  hasMethod(name: string): boolean {
    return name in this;
  }

  async pullModel(model: string): Promise<RPCAPIResponse<any>> {
    const requestTimestamp = performance.now();
    const timer = new Timer();
    timer.start();
    const ollama = LazyOllama.getInstance();
    const state = ollama.checkModelStateInCaches(model);
    /**
     * Model is already running
     */
    if (state[model]?.includes(OllamaClientCacheType.Running)) {
      timer.stop();
      return {
        requested_method: 'pullModel',
        response_data: { model, status: 'already-running' },
        request_accepted: true,
        request_timestamp: requestTimestamp,
        response_timestamp: performance.now(),
        response_time_ms: timer.elapsed() || 0
      };
    }
    /**
     * Model is already downloaded, but not running in memory
     */
    if (state[model]?.includes(OllamaClientCacheType.Available)) {
      timer.stop();
      return {
        requested_method: 'pullModel',
        response_data: { model, status: 'already-pulled' },
        request_accepted: true,
        request_timestamp: requestTimestamp,
        response_timestamp: performance.now(),
        response_time_ms: timer.elapsed() || 0
      };
    }
    /**
     * Model is not downloaded yet
     */
    const stream = false;
    const prestart = false;
    /** 
     * Offload this to the Bun promise task queue, 
     * do not block response on pull 
     * */
    ollama.pullModel(model, stream, prestart);
    timer.stop();

    return {
      requested_method: 'pullModel',
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0,
      response_data: { model, status: 'pull-queued' }
    };
  }

  async preheatModel(model: string): Promise<RPCAPIResponse<any>> {
    const requestTimestamp = performance.now();
    const timer = new Timer();
    timer.start();

    const ollama = LazyOllama.getInstance();
    const state = ollama.checkModelStateInCaches(model);

    /**
     * Model is already running
     */
    if (state[model]?.includes(OllamaClientCacheType.Running)) {
      timer.stop();
      return {
        requested_method: 'preheatModel',
        request_accepted: true,
        request_timestamp: requestTimestamp,
        response_timestamp: performance.now(),
        response_time_ms: timer.elapsed() || 0,
        response_data: { model, status: 'already-running' }
      };
    }

    /**
     * Model is already downloaded, but not running in memory
     */
    if (state[model]?.includes(OllamaClientCacheType.Available)) {
      await ollama.startModel(model);
      timer.stop();
      return {
        requested_method: 'preheatModel',
        request_accepted: true,
        request_timestamp: requestTimestamp,
        response_timestamp: performance.now(),
        response_time_ms: timer.elapsed() || 0,
        response_data: { model, status: 'running' }
      };
    }

    /**
     * Model is not downloaded yet
     */
    const stream = false;
    const prestart = true;

    await ollama.pullModel(model, stream, prestart);

    timer.stop();

    return {
      requested_method: 'preheatModel',
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0,
      response_data: { model, status: 'running' }
    };
  }

  async showModelStates(): Promise<RPCAPIResponse<any>> {
    const requestTimestamp = performance.now();
    const timer = new Timer();
    timer.start();

    const ollama = LazyOllama.getInstance();
    const state = ollama.getStateOfCaches();

    timer.stop();

    return {
      requested_method: 'showModelStates',
      response_data: state,
      request_accepted: true,
      request_timestamp: requestTimestamp,
      response_timestamp: performance.now(),
      response_time_ms: timer.elapsed() || 0
    };
  }
}

export default RPCController;
