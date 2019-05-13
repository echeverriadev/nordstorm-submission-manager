const format = (data) => {
    return {
        id: data.__pk_division_t,
        number: data.division_number,
        name: data.name_display
    };
};

exports.transform = (data) => {
    if(Array.isArray(data)){
        return data.map(item => {
            return format(item);
        })
    }

    return format(data);

};