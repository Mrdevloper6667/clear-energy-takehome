import { ApiClient } from './client';

describe('ApiClient', () => {
  it('should construct with baseUrl', () => {
    const client = new ApiClient({ baseUrl: 'http://test.local' });
    expect(client).toBeDefined();
    // In a real test, we would mock global.fetch to verify network calls
    // and test the AbortSignal and Idempotency key logic.
  });
});
