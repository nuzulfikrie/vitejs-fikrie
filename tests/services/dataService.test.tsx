import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  fetchData,
  postData,
  deleteData,
} from '../../src/services/dataService';

const server = setupServer(
  rest.get('https://api.example.com/data', (req, res, ctx) => {
    return res(
      ctx.json([{ id: 1, name: 'John' }]),
    );
  }),
  rest.post('https://api.example.com/data', (req, res, ctx) => {
    return res(
      ctx.json({ id: 1, name: 'John' }),
    );
  }),
  rest.delete('https://api.example.com/data', (req, res, ctx) => {
    return res(
      ctx.status(204),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('dataService', () => {
  it('should fetch data successfully', async () => {
    render(<YourComponent />);

    const url = 'https://api.example.com/data';
    const data = await fetchData(url);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(data).toEqual([{ id: 1, name: 'John' }]);
  });

  it('should post data successfully', async () => {
    render(<YourComponent />);

    const url = 'https://api.example.com/data';
    const postData = { name: 'John' };
    const expectedRequestBody = JSON.stringify(postData);

    const data = await postData(url, postData);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: expectedRequestBody,
    });
    expect(data).toEqual({ id: 1, name: 'John' });
  });

  it('should delete data successfully', async () => {
    render(<YourComponent />);

    const url = 'https://api.example.com/data';
    await deleteData(url);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'DELETE',
    });
  });
});
