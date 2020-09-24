import axios from './axios';

const getLocalProduct = async (country) => {
  const response = await axios.get(
    `products/get-random-local-product?country=${country}`
  );
  return response;
};

const getGlobalProduct = async (country) => {
  const response = await axios.get(
    `products/get-random-global-product?country=${country}`
  );
  return response;
};

export { getLocalProduct, getGlobalProduct };
