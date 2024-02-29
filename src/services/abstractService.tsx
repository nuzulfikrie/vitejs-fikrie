import URL_LINKS from '../constants/urls';
import axios from 'axios';
//    const url =URL_LINKS.FETCH_ABSTRACT.value +`?doi=${encodedDoi}&keyidentifier=${encodedIdentifier}`;
export const abstractService = {
  retrieveAbstractData: async (doi: string, identifier: string) => {
    const encodedDoi = encodeURIComponent(doi);
    const encodedIdentifier = encodeURIComponent(identifier);

    const url =
      URL_LINKS.FETCH_ABSTRACT.value +
      `?doi=${encodedDoi}&keyidentifier=${encodedIdentifier}`;

    // Previous code omitted for brevity
    return axios
      .get(url) // Make sure to return this promise
      .then((response) => {
        if (response.status === 200) {
          return response.data; // This data will be returned to the caller of retrieveAbstractData
        } else {
          throw new Error('Error fetching abstract');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error; // It's better to throw the original error object
      });
  },
};
