const format = (data) => {
    return {
        id: data.__pk_item || null,
        image: data.image || "https://www.knittedhome.com/communities/5/004/012/872/235/images/4628207884.jpg",
        is_priority: data.is_priority || 0,
        department_number: data.department_number || "",
        vpn: data.vpn || "",
        style_group_number: data.style_group_number || "",
        brand: data.brand || "",
        color: data.color || "",
        size: data.size || "",
        description: data.description || "",
        in_stock_week: data.in_stock_week || "",
        price: data.price || "",

        //EXTRA TODO: Borrar
        category: ['category: example1', 'category: example2'],
        cycle: -1,
        annSalePrice: 123,
        productPriority: "normal",
        availableInCanada: true,
        canadaPrice: 123,
        countryOrigin: "USA",
        specifyCountry: "USA",
        requestExtension: true,
        extensionReason: "sample",
        requestCancelation: false,
        cancelationReason: "",
        departament: "Via C"
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