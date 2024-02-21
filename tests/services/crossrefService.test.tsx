import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchCrossRefMetadata } from '../../src/services/crossrefService';

// Mocking the global fetch function
global.fetch = vi.fn();

const realDoi = '10.1016/j.bmcl.2014.10.009';
const failDoi = '10.1000/xyz123';

describe('fetchCrossRefMetadata', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('should fetch and return CrossRef metadata for a valid DOI', async () => {
    // Mocking a successful fetch response
    const mockDOI = realDoi;
    const mockResponse = {
      message: {
        doi: mockDOI,
      },
    };

    // Setup fetch to return a successful response
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    } as Response);

    const metadata = await fetchCrossRefMetadata(mockDOI);

    // Assertions
    expect(fetch).toHaveBeenCalledWith(
      `https://api.crossref.org/works/${mockDOI}`,
    );
    expect(metadata).toEqual(mockResponse.message);
  });

  it('should handle fetch errors gracefully', async () => {
    // Simulating a network error
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    await expect(fetchCrossRefMetadata(failDoi)).rejects.toThrow(
      'Network error',
    );

    // Additional assertions can be made here to verify how errors are handled
  });
});
