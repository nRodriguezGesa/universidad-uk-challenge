//Server
export const BASE_URL = process.env.NODE_ENV === 'local' ? 'localhost' : '';

//API
export const API_TAGS = {
  PRODUCT: 'Product',
};

//Mongo
export const MONGO_ERROR_CODES = {
  DUPLICATE_KEY: 11000,
};
