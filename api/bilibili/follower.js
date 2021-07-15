const Axios = require('axios');
import to from 'src/utils/to.js';

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
  const [error, result] = await to(getBilibiliFollower(672328094));
  if(error){
    response.status(error.response.status).send(error.response.data);
  }else{
    response.status(result.status).send(result.data);
  }
};
