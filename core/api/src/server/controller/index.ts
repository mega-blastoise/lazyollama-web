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
        requested_method: 'pullModel'
      };
    }
    /**
     * Model is already downloaded, but not running in memory
     */
    if (state[model]?.includes(OllamaClientCacheType.Available)) {
      timer.stop();
      return {
        requested_method: 'pullModel'
      };
    }
    /**
     * Model is not downloaded yet
     */
    const stream = false;
    const prestart = false;
    ollama.pullModel(model, stream, prestart);
    timer.stop();

    return {
      requested_method: 'pullModel'
    };
  }

  async preheatModel(model: string): Promise<RPCAPIResponse<any>> {
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
        requested_method: 'preheatModel'
      };
    }

    /**
     * Model is already downloaded, but not running in memory
     */
    if (state[model]?.includes(OllamaClientCacheType.Available)) {
      await ollama.startModel(model);
      timer.stop();
      return {
        requested_method: 'preheatModel'
      };
    }

    /**
     * Model is not downloaded yet
     */
    const stream = false;
    const prestart = true;

    ollama.pullModel(model, stream, prestart);

    return {
      requested_method: 'preheatModel'
    };
  }

  async showModelStates(): Promise<RPCAPIResponse<any>> {
    const timer = new Timer();
    timer.start();

    const ollama = LazyOllama.getInstance();
    const state = ollama.getStateOfCaches();

    timer.stop();

    return {
      requested_method: 'showModelStates',
      response_data: state
    };
  }
}

export default RPCController;
