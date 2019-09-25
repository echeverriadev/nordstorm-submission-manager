const axios = require("axios");
const baseUrl = process.env.FIT_BASE_URL;

let pushItemImageToFit = async (name, itemId, previousImage) => {
  return axios(
    `${baseUrl}/index.php/api/storeItemImageFromFisToFit/YmFja2Rvb3Jmb3JoZWFkbGVzc2NsaWVudA%3D%3D/editorial?image_name=${name}&__pk_item=${itemId}&previous_image_name=${previousImage}`
  )
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
};

module.exports = {
  pushItemImageToFit
};
