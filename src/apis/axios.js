import axios from 'axios';

// export default axios.create({
//   baseURL: 'http://localhost:3000'
// });

const mainAxios = axios.create({
  // baseURL: 'https://pajak-pemotongan-hewan.herokuapp.com'
  baseURL: 'http://localhost:3000'
});

const midTrans = axios.create({
  baseURL: 'https://api.sandbox.midtrans.com/v2'
});

const regionAxios = axios.create({
  baseURL: 'https://www.emsifa.com/api-wilayah-indonesia'
})

export { mainAxios, midTrans, regionAxios };