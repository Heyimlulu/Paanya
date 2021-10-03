const axios = require('axios');

module.exports = async (type) => {

    const response = await axios.get(`https://waifu.pics/api/sfw/${type}`);
    
    return response.data.url;

}