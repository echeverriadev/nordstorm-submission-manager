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
    "retail_price"
  ];
}

function getItemSelects() {
  return ["nmg_priority", "in_stock_week"];
}

export { getFisColumns, getItemSelects };
