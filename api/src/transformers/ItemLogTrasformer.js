const format = (data) => {
    //SELECT _fk_item_editorial, user_name, time_stamp,`event`, details FROM fit.log
   console.log("DETAILS", data.details)
    return {
        _fk_item_editorial: data._fk_item_editorial,
        user_name: data.user_name,
        time_stamp: data.time_stamp,
        lan_id: data.lan_id,
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

const randomDetails = [
    {
        "Your Field": "AbC",
        "My Field": "123",
        "His Field": "Lorem ipsum",
    },
    {
        "My Field": "123",
        "Your Field": "AbC",
        "His Field": "Lorem ipsum",
    },
    {
        "His Field": "Lorem ipsum",
        "Your Field": "AbC",
        "My Field": "123",
    },
    {
        "His Field": "Lorem ipsum",
        "My Field": "123",
        "Your Field": "AbC",
    },
    {
        "Your Field": "AbC",
        "His Field": "Lorem ipsum",
        "My Field": "123",
    },
]