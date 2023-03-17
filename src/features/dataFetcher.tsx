import axios from 'axios';


export const useFetchData = () => {
  return new Promise((resolve, reject) => {
    try {
      axios.post('https://example.com/api').then(res =>{
        resolve(res.data);
      })
    } catch (err) {
      reject(err);
    }
  });
};
