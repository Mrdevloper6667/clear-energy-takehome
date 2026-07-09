import { v4 as uuidv4 } from 'uuid';

export interface ApiClientOptions {
  baseUrl: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl;
  }

  async get<T>(path: string, signal?: AbortSignal): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
    });

    if (!response.ok) {
      throw new Error(`API GET request failed with status: ${response.status}`);
    }

    return response.json();
  }

  async post<T>(path: string, body: any, signal?: AbortSignal): Promise<T> {
    const idempotencyKey = uuidv4();
    
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify(body),
      signal,
    });

    if (!response.ok) {
      throw new Error(`API POST request failed with status: ${response.status}`);
    }

    return response.json();
  }
}
