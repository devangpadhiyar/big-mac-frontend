import axios from './axios';

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const getCountryData = async () => {
  // const url = `https://ipvigilante.com/json/`;
  // const response = await axios.get(url, {
  //   headers: { 'Access-Control-Allow-Origin': ['https://ipvigilante.com'] },
  // });
  await sleep(2000);
  // return response;
  return {
    status: 200,
    data: {
      country_name: 'India',
      Date: '2012-07-01',
      'Local price': '2.04',
      'Dollar ex': '0.8248443106363673',
      'Dollar price': '2.4731940000000003',
      'Dollar PPP': '0.4714038128249567',
      'Dollar valuation': '-42.84935875216637',
    },
  };
};

export { getCountryData };
