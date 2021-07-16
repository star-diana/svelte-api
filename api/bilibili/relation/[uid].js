const Axios = require('axios');
import to from '../../../src/utils/to.js';

const axios = Axios.create({
  responseType: 'json',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

const getBilibiliFollower = async (uid) => {
  return axios.get(`https://api.bilibili.com/x/relation/stat?vmid=${uid}`);
};

module.exports = async (request, response) => {
  const {query: {uid}} = request;
  const [error, result] = await to(getBilibiliFollower(uid));
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (error) {
    response.status(error?.response?.status ?? 504).send(error?.response?.data ?? error.message);
  } else {
    response.status(result.status).send(result.data);
  }
};
