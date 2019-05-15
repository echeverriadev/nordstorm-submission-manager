import { apiFetch } from './apiFetch'

export const getCyclesApi = () => apiFetch(`/cycles`)
export const getDivisionsApi = () => apiFetch(`/divisions`)
export const getItemsApi = (start, end, filter, order) => apiFetch(`/items?range=[${start},${end}]&filter=${JSON.stringify(filter)}&order=${order}`)
export const patchItemApi = (id, field, value) => apiFetch(`/items/${id}`,{method: 'PATCH', body:{field, value}})
export const storeItemApi = (body) => apiFetch(`/items`,{ method: 'POST', body })
export const uploadImageApi = (body) => apiFetch(`/items/upload`,{ method: 'POST', body, headers: {} }) //Let empty the content-type
export const uploadExcelApi = (body) => apiFetch(`/items/import`,{ method: 'POST', body, headers: {} }) //Let empty the content-type