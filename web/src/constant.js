//(item_editorial._fk_department_t = '' OR item_editorial._fk_department_t is NULL OR item_editorial.vpn = '' OR item_editorial.vpn is NULL OR item_editorial.brand = '' OR item_editorial.brand is NULL)
export const cannedFiltersAll = [
  {
    label: "Incomplete",
    where:
      "(item_editorial.brand = '' OR item_editorial.brand IS NULL OR item_editorial.vpn = '' OR item_editorial.vpn IS NULL OR item_editorial.department_number = '' OR item_editorial.department_number IS NULL)",
    id: 1
  },
  {
    label: "Missing SGN",
    where: "COALESCE(style_group_number, '')  = ''",
    id: 2
  },
  {
    label: "Missing VPN",
    where: "COALESCE(vpn, '') = ''",
    id: 3
  },
  {
    label: "Available in Canada",
    where: "available_in_canada = 1",
    id: 4
  },
  {
    label: "NMG Priority 1",
    where: "nmg_priority = 1",
    id: 5
  },
  {
    label: "NMG Priority 2",
    where: "nmg_priority = 2",
    id: 6
  },
  {
    label: "Requested Extension",
    where: "request_extension = 1",
    id: 7
  },
  {
    label: "Requested Cancellation",
    where: "request_cancellation = 1",
    id: 8
  },
  {
    label: "Tagged Missy",
    where: "tagged_missy = 1",
    id: 9
  },
  {
    label: "Tagged Encore",
    where: "tagged_encore = 1",
    id: 10
  },
  {
    label: "Tagged Petite",
    where: "tagged_petite = 1",
    id: 11
  },
  {
    label: "Tagged Extended",
    where: "tagged_extended = 1",
    id: 12
  },
  {
    label: "No Image",
    where: "item_editorial.image IS NULL",
    id: 13
  }
];
