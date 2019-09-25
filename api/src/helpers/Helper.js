let getEmailData = () => {
  let email = {
    address: process.env.EMAIL_ADDRESS,
    subject: process.env.EMAIL_SUBJECT
  };

  return email;
};

let getImagesPath = async () => {
  return `${__dirname}/../../public/${process.env.FIS_IMAGES_PATH}`;
};

module.exports = {
  getEmailData,
  getImagesPath
};
