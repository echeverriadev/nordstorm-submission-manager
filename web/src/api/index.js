import { apiFetch } from './apiFetch'

export const getCyclesApi = () => apiFetch(`/cycles`)
export const getDivisionsApi = () => apiFetch(`/divisions`)
export const getItemsApi = (start, end, filter) => apiFetch(`/items?range=[${start},${end}]&filter=${JSON.stringify(filter)}`)
export const patchItemApi = (id, field, value) => apiFetch(`/items/${id}`,{method: 'PATCH', body:{field, value}})
export const storeItemApi = (body) => apiFetch(`/items`,{ method: 'POST', body })
export const uploadImageApi = (body) => apiFetch(`/items/upload`,{ method: 'POST', body, headers: {} }) //Let empty the content-type