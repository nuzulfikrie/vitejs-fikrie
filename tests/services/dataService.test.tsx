import { describe, it, expect, vi } from 'vitest';
import {
  fetchData,
  postData,
  deleteData,
} from '../../src/services/dataService';

// Mocking global fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  }),
) as any;

describe('dataService', () => {
  describe('fetchData', () => {
    it('should fetch data successfully', async () => {
      const data = await fetchData('http://example.com/data');
      expect(data).toEqual({ success: true });
      expect(fetch).toHaveBeenCalledWith('http://example.com/data');
    });

    it('should throw an error if fetching fails', async () => {
      (fetch as vi.Mock).mockImplementationOnce(() =>
        Promise.reject(new Error('Network error')),
      );
      await expect(fetchData('http://example.com/data')).rejects.toThrow(
        'Error fetching data',
      );
    });
  });

  describe('postData', () => {
    it('should post data successfully', async () => {
      const body = { key: 'value' };
      const data = await postData('http://example.com/post', body);
      expect(data).toEqual({ success: true });
      expect(fetch).toHaveBeenCalledWith('http://example.com/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    });

    it('should throw an error if posting fails', async () => {
      (fetch as vi.Mock).mockImplementationOnce(() =>
        Promise.reject(new Error('Network error')),
      );
      await expect(postData('http://example.com/post', {})).rejects.toThrow(
        'Error posting data',
      );
    });
  });

  describe('deleteData', () => {
    it('should call fetch with DELETE method', async () => {
      await deleteData('http://example.com/delete');
      expect(fetch).toHaveBeenCalledWith('http://example.com/delete', {
        method: 'DELETE',
      });
    });

    it('should throw an error if delete fails', async () => {
      (fetch as vi.Mock).mockImplementationOnce(() =>
        Promise.reject(new Error('Network error')),
      );
      await expect(deleteData('http://example.com/delete')).rejects.toThrow(
        'Error deleting data',
      );
    });
  });
});
