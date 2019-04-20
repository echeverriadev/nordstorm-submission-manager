export const cannedFiltersAll = [
    {
        label: "Incomplete",
        where: "(COALESCE(_fk_department_t, '') = '' OR COALESCE(vpn, '')  = '' OR COALESCE(brand, '')  = '')",
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
        where: "COALESCE(image, '') = ''",
        id: 13
    },
    
]