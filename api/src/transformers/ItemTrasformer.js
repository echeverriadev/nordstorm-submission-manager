const format = (data) => {
    return {
        id: data.__pk_item || null,
        image: data.image || "https://www.knittedhome.com/communities/5/004/012/872/235/images/4628207884.jpg",
        nmg_priority: data.nmg_priority || 0,
        department_number: data.department_number || "",
        vpn: data.vpn || "",
        style_group_number: data.style_group_number || "",
        brand: data.brand || "",
        color: data.color || "",
        size: data.size || "",
        description: data.description || "",
        in_stock_week: data.in_stock_week || "",
        sale_price: data.sale_price || 0,
        category: [],
        _fk_cycle: data._fk_cycle || "",
        retail_price: data.retail_price || 0,
        is_priority: data.is_priority || "",
        available_in_canada: data.available_in_canada || "",
        price_cad: data.price_cad || 0,
        country_of_origin: data.country_of_origin || "",
        country_of_origin_other: data.country_of_origin_other || "",
        request_extension: data.request_extension || "",
        request_extension_note: data.request_extension_note || "",
        request_cancellation: data.request_cancellation || "",
        request_cancellation_notes: data.request_cancellation_notes || "",
        department_number: data.department_number || "",
        tagged_missy: data.tagged_missy || 0,
        tagged_encore: data.tagged_encore ||0,
        tagged_petite: data.tagged_petite || 0,
        tagged_extended: data.tagged_extended || 0,
        department: data.department || ""
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