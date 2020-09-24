import axios from './axios';

const getCountryData = async () => {
  const url = `country/country-data/`;
  const response = await axios.get(url);

  // await sleep(2000);
  return response;
  // return {
  //   status: 200,
  //   data: {
  //     data: {
  //       country_name: 'India',
  //       Date: '2012-07-01',
  //       'Local price': '2.04',
  //       'Dollar ex': '0.8248443106363673',
  //       'Dollar price': '2.4731940000000003',
  //       'Dollar PPP': '0.4714038128249567',
  //       'Dollar valuation': '-42.84935875216637',
  //     },
  //   },
  // };
};

export { getCountryData };
