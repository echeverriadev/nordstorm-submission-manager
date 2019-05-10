const format = (data) => {
    //SELECT _fk_item_editorial, user_name, time_stamp,`event`, details FROM fit.log
    return {
        _fk_item_editorial: data._fk_item_editorial,
        user_name: data.user_name,
        time_stamp: data.time_stamp,
        event: data.event,
        details: data.details
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