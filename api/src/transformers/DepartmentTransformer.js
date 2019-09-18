const format = data => {
  return {
    id: data.__pk_department_t,
    departmentName: data.name_display
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
