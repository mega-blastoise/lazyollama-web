enum OllamaClientCacheType {
  PullQueued = "pull-queued",
  PullCompleted = "pull-completed",
  Running = "running",
  Stopped = "stopped",
  Available = "available",
}

class OllamaClient {
  private baseUrl = process.env.DOCKER_NETWORK_OLLAMA_API_URL;
  private cache = new Map<string, Array<string>>();

  constructor() {
    this.cache.set(OllamaClientCacheType.PullQueued, []);
    this.cache.set(OllamaClientCacheType.PullCompleted, []);
    this.cache.set(OllamaClientCacheType.Running, []);
    this.cache.set(OllamaClientCacheType.Stopped, []);
    this.cache.set(OllamaClientCacheType.Available, []);
  }

  /**
   * Performs a POST request to the Ollama API at the given endpoint,
   * with the given payload.
   * @param endpoint The endpoint to POST to.
   * @param payload The payload to send with the request.
   * @returns The response from the API, parsed as JSON.
   */
  private async _post<T, P>(endpoint: string, payload: P): Promise<T> {
    const response = await Bun.fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // Add other headers
      body: JSON.stringify(payload),
    });
    return response.json() as T;
  }

  /**
   * Performs a GET request to the Ollama API at the specified endpoint.
   * @param endpoint The endpoint to send the GET request to.
   * @returns The response from the API, parsed as JSON.
   */

  private async _get<T>(endpoint: string): Promise<T> {
    const response = await Bun.fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers: {},
    }); // Add other headers
    return response.json() as T;
  }

  /**
   * Pull a model from the Ollama library.
   * @param model The name of the model to pull.
   * @param stream Whether to stream the response.
   */
  async pullModel(
    model: string,
    stream = false // Streaming would be optimized but we're not going to block on pulling a model, we'll do this a different way with event based tracking
  ): Promise<any> {
    try {
      const payload = { model, stream };
      const cache = this.cache.get(OllamaClientCacheType.PullQueued)!;

      const onSuccess = ()
      const promise = this._post("/api/pull", payload).then().catch();
    } catch (e) {
      /** Report error */
    }
  }

  /**
   * Start a model by loading it into memory (empty prompt).
   * @param model The model name to load.
   */
  async startModel(model: string): Promise<any> {
    // Sending an empty prompt loads the model into memory.
    const payload = { model };
    return this._post("/api/generate", payload);
  }

  /**
   * Prompt a model to generate a response.
   * @param model The model name.
   * @param prompt The prompt to be sent.
   * @param stream Whether to use a streaming response.
   */
  async promptModel(
    model: string,
    prompt: string,
    stream = false
  ): Promise<any> {
    const payload = { model, prompt, stream };
    return this._post("/api/generate", payload);
  }

  /**
   * Stop a model by unloading it from memory.
   * @param model The model name to unload.
   */
  async stopModel(model: string): Promise<any> {
    // Setting keep_alive to 0 unloads the model.
    const payload = { model, keep_alive: 0 };
    return this._post("/api/generate", payload);
  }

  /**
   * Cleanup memory by unloading all running models.
   */
  async cleanupMemory(): Promise<any[] | null> {
    const running = await this._get<{ models: { name: string }[] }>("/api/ps");
    if (running.models && Array.isArray(running.models)) {
      const unloadPromises = running.models.map((m) => this.stopModel(m.name));
      return Promise.all(unloadPromises);
    }
    return null;
  }
}

export default OllamaClient;
