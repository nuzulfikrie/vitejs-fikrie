// services/dataService.tsx

/**
 * Fetch data from the specified URL.
 * @param url - The URL to fetch data from.
 * @returns A promise that resolves to the fetched data.
 * @throws An error if there is an issue fetching the data.
 */
export const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching data');
  }
};

/**
 * Post data to the specified URL.
 * @param url - The URL to post data to.
 * @param body - The data to be posted.
 * @returns A promise that resolves to the posted data.
 * @throws An error if there is an issue posting the data.
 */
export const postData = async (url: string, body: any): Promise<any> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error posting data');
  }
};

/**
 * Delete data from the specified URL.
 * @param url - The URL to delete data from.
 * @throws An error if there is an issue deleting the data.
 */
export const deleteData = async (url: string): Promise<void> => {
  try {
    await fetch(url, {
      method: 'DELETE',
    });
  } catch (error) {
    throw new Error('Error deleting data');
  }
};