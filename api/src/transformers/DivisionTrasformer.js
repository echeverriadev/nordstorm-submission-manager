const format = (data) => {
    return {
        id: data.id,
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