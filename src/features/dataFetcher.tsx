import axios from 'axios';
import URL_LINKS from '../constants/urls';

const projectId = localStorage.getItem('course_id');

const useFetchData = (url: string) => {
  return new Promise((resolve, reject) => {
    try {
      axios.post(url).then(res => {
        resolve(res.data);
      })
    } catch (err) {
      reject(err);
    }
  });
};


const dataFetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data; // Return the data from the response
  } catch (err) {
    return err; // Re-throw the error to be handled by the caller
  }
};

//data poster
const dataPoster = async (url: string, data: any) => {
  try {
    const response = await axios.post(url, data);
    return response.data; // Return the data from the response
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err; // Re-throw the error to be handled by the caller
  }
};

//data - delete
const dataDelete = async (url: string, data: any) => {
  try {
    const response = await axios.delete(url, data);
    return response.data; // Return the data from the response
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err; // Re-throw the error to be handled by the caller
  }
};

const fetchStep07 = async () => {
  const url = URL_LINKS.STEP07.value + projectId;
  try {
    const data = await dataFetcher(url);
    return data;
  } catch (err) {
    // Handle or log the error as needed
    console.error('Error in fetchStep07:', err);
    // Return null or handle the error as appropriate for your application
    return err;
  }
};


const fetchSubtheme = async (subthemeId: string) => {
  const url = URL_LINKS.SUBTHEME.value + subthemeId;
  try {
    const data = await dataFetcher(url);
    return data;
  } catch (err) {
    // Handle or log the error as needed
    console.error('Error in fetchSubtheme:', err);
    // Return null or handle the error as appropriate for your application
    return null;
  }
};


export { fetchStep07, fetchSubtheme, dataFetcher };