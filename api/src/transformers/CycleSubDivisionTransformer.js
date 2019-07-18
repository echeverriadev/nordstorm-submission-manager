const format = data => {
  return {
    id: data.id,
    idCycle: data._fk_cycle,
    submissions_limit: data.submissions_limit
  };
};

exports.transform = data => {
  if (Array.isArray(data)) {
    return data.map(item => {
      return format(item);
    });
  }

  return format(data);
};
