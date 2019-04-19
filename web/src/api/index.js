import { apiFetch } from './apiFetch'

export const getCyclesApi = () => apiFetch(`/cycles`)
export const getDivisionsApi = () => apiFetch(`/divisions`)
export const getItemsApi = (start, end, filter) => apiFetch(`/items?range=[${start},${end}]&filter=${JSON.stringify(filter)}`)
export const patchItemApi = (id, field, value) => apiFetch(`/items/${id}`,{method: 'PATCH', body:{field, value}})
export const uploadImageApi = (image) => apiFetch(`/items/upload`,{ method: 'POST', body: image})