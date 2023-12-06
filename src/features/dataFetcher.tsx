import axios from 'axios';
import URL_LINKS from '../constants/urls';

const useFetchData = (url:string) => {
  return new Promise((resolve, reject) => {
    try {
      axios.post(url).then(res =>{
        resolve(res.data);
      })
    } catch (err) {
      reject(err);
    }
  });
};


const fetchStep07 = async () => {
  const url = URL_LINKS.STEP07.value;
  const data = await useFetchData(url);
  return data;
};

export { fetchStep07};
