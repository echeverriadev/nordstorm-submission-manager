const imagePath = `${process.env.API_URL}${process.env.FIS_IMAGES_PATH}`;
const itemDefaultImage = process.env.FIS_ITEM_DEFAULT_IMAGE;

const format = data => {
  return {
    id: data.__pk_item || null,
    live_date: data.live_date || null,
    image:
      data.image !== null && data.image !== ""
        ? `${imagePath}${data.image}`
        : itemDefaultImage,
    nmg_priority: data.nmg_priority || null,
    department_number: data.department_number || "",
    vpn: data.vpn || "",
    style_group_number: data.style_group_number || "",
    brand: data.brand || "",
    color: data.color || "",
    size: data.size || "",
    description: data.description || "",
    in_stock_week: data.in_stock_week || "",
    sale_price: data.sale_price || null,
    category: [],
    _fk_cycle: data._fk_cycle || "",
    retail_price: data.retail_price || null,
    is_priority: data.is_priority || 0,
    available_in_canada: data.available_in_canada || "",
    price_cad: data.price_cad || null,
    country_of_origin: data.country_of_origin || null,
    country_of_origin_other: data.country_of_origin_other || null,
    request_extension: data.request_extension || "",
    request_extension_note: data.request_extension_note || "",
    request_cancellation: data.request_cancellation || "",
    request_cancellation_notes: data.request_cancellation_notes || "",
    department_number: data.department_number || "",
    tagged_missy: data.tagged_missy || 0,
    tagged_encore: data.tagged_encore || 0,
    tagged_petite: data.tagged_petite || 0,
    tagged_extended: data.tagged_extended || 0,
    department: data.department || "",
    type: data.type || "",
    creative_story_name: data.creative_story_name || "",
    shot_name: data.shot_name || ""
  };
};

exports.transform = data => {
  if (Array.isArray(data)) {
    var resArr = [];

    data.filter(function(item) {
      var i = resArr.findIndex(x => x.__pk_item == item.__pk_item);
      if (i <= -1) {
        resArr.push(item);
      }
    });

    return resArr.map(item => {
      return format(item);
    });
  }

  return format(data);
};
