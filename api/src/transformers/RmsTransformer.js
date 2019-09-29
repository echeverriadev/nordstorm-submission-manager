const format = data => {
  return {
    description: data.description,
    brand: data.brand,
    sgn: data.sgn
  };
};

exports.transform = data => {
  if (Array.isArray(data)) {
    let formatedData = data.map(item => {
      return format(item);
    });

    if (formatedData.length === 1) {
      return formatedData[0];
    } else {
      return formatedData;
    }
  }
};
