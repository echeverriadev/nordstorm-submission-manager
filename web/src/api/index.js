import { apiFetch } from './apiFetch'

export const getCyclesApi = () => apiFetch(`/api/cycles`)
export const getDivisionsApi = () => apiFetch(`/api/divisions`)
export const getItemsApi = (start, end, filter, order) => apiFetch(`/api/items?range=[${start},${end}]&filter=${JSON.stringify(filter)}&order=${order}`)
export const patchItemApi = (id, field, value) => apiFetch(`/api/items/${id}`,{method: 'PATCH', body:{field, value}})
export const storeItemApi = (body) => apiFetch(`/api/items`,{ method: 'POST', body })
export const uploadImageApi = (body) => apiFetch(`/api/items/upload`,{ method: 'POST', body, headers: {} }) //Let empty the content-type
export const uploadExcelApi = (body) => apiFetch(`/api/items/import`,{ method: 'POST', body, headers: {} }) //Let empty the content-type