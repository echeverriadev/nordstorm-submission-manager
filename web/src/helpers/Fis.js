function getFisColumns() {
  return [
    "nmg_priority",
    "department_number",
    "vpn",
    "style_group_number",
    "brand",
    "color",
    "size",
    "description",
    "in_stock_week",
    "retail_price",
    "sale_price",
    "available_in_canada",
    "price_cad",
    "country_of_origin",
    "country_of_origin_other",
    "request_extension_note",
    "request_cancellation_notes"
  ];
}

function getItemSelects() {
  return ["nmg_priority", "in_stock_week", "_fk_cycle", "country_of_origin"];
}

function getItemChecks() {
  return ["available_in_canada", "request_extension", "request_cancellation"];
}

function getItemChips() {
  return ["tagged_missy", "tagged_encore", "tagged_petite", "tagged_extended"];
}

export { getFisColumns, getItemSelects, getItemChecks, getItemChips };
