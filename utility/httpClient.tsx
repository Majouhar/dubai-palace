class HttpClient {
  async get<T>(url: string, config: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(url, {
        method: "GET",
        ...config,
      });
      return await response.json();
    } catch (error) {
      console.error("HTTP GET request failed:", error);
      throw error;
    }
  }

  async post<T>(
    url: string,
    data: any = {},
    config: RequestInit = {}
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          ...config.headers,
        },
        ...config,
      });
      return await response.json();
    } catch (error) {
      console.error("HTTP POST request failed:", error);
      throw error;
    }
  }
  async put<T>(
    url: string,
    data: any = {},
    config: RequestInit = {}
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          ...config.headers,
        },
        ...config,
      });
      return await response.json();
    } catch (error) {
      console.error("HTTP POST request failed:", error);
      throw error;
    }
  }

  // Add other HTTP methods as needed
}

export default HttpClient;
