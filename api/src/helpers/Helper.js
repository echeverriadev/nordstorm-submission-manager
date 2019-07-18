let getEmailData = () => {
  let email = {
    address: process.env.EMAIL_ADDRESS,
    subject: process.env.EMAIL_SUBJECT
  };

  return email;
};

module.exports = {
  getEmailData
};
