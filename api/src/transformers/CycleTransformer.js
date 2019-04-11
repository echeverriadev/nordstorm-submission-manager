const format = (data) => {
    return {
        id: data.__pk_cycle,
        name: data.name
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