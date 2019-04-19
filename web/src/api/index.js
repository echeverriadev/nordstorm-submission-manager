import { apiFetch } from './apiFetch'

const PORT_BACKEND = process.env.REACT_APP_PORT_BACKEND || '8081';
const URL_BACKEND = process.env.REACT_APP_API_URL_BACKEND || 'http://localhost';
export const API_URL_BACKEND = `${URL_BACKEND}:${PORT_BACKEND}`

export const getCyclesApi = () => apiFetch(`/cycles`)
export const getDivisionsApi = () => apiFetch(`/divisions`)
export const getItemsApi = (start, end, filter) => apiFetch(`/items?range=[${start},${end}]&filter=${JSON.stringify(filter)}`)
export const patchItemApi = (id, field, value) => apiFetch(`/items/${id}`,{method: 'PATCH', body:{field, value}})
export const uploadImageApi = (image) => apiFetch(`/items/upload`,{ method: 'POST', body: image})