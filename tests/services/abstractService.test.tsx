import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { abstractService } from '../../src/services/abstractService'; // Ensure the path matches your project structure

// Mock the entire Axios module
vi.mock('axios', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    post: vi.fn(),
  };
});

describe('abstractService', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  it('should fetch abstract data successfully', async () => {
    const mockDoi = '10.1016/j.arabjc.2017.05.011';
    const mockIdentifier = 'Elsevier';
    const mockAbstract = 'This is a mock abstract text.';
    const mockResponse = { data: { data: { abstract: mockAbstract } } };

    // Mock the axios.post method to resolve with mockResponse
    axios.post.mockResolvedValue(mockResponse);

    // Call the retrieveAbstractData function with mock parameters
    const abstractData = await abstractService.retrieveAbstractData(
      mockDoi,
      mockIdentifier,
    );

    // Assertions to check if axios.post was called correctly and the expected result was returned
    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      doi: mockDoi,
      keyidentifier: mockIdentifier,
    });
    expect(abstractData).toEqual(mockAbstract);
  });

  it('should throw an error if the DOI or identifier is missing', async () => {
    // Expect the retrieveAbstractData function to throw an error when called with missing parameters
    await expect(abstractService.retrieveAbstractData('', '')).rejects.toThrow(
      'Identifier and DOI are required',
    );
  });

  it('should handle non-200 responses gracefully', async () => {
    const mockDoi = '10.1000/xyz456';
    const mockIdentifier = 'anotherTestIdentifier';

    // Mock the axios.post method to reject with an error
    axios.post.mockRejectedValue(new Error('Network Error'));

    // Expect the retrieveAbstractData function to throw an error when the axios call fails
    await expect(
      abstractService.retrieveAbstractData(mockDoi, mockIdentifier),
    ).rejects.toThrow('Error fetching abstract: Error: Network Error');
  });
});
