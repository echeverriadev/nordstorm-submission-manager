import { apiFetch } from "./apiFetch";

export const getCyclesApi = () => apiFetch(`/cycles`);
export const getItemlogsApi = _fk_item_editorial =>
  apiFetch(`/itemlogs/${_fk_item_editorial}`);
export const nauthLogin = () =>
  apiFetch(`/nauth/login`, { method: "POST", headers: {} });
export const nauthSetCookie = body =>
  apiFetch(`/nauth/setCookie`, { method: "POST", body });
export const nauthLogout = () => apiFetch(`/nauth/logout`, { method: "POST" });
export const getDivisionsApi = () => apiFetch(`/divisions`);
export const getItemsApi = (start, end, filter, order) =>
  apiFetch(
    `/items?range=[${start},${end}]&filter=${JSON.stringify(
      filter
    )}&order=${order}`
  );
export const patchItemApi = (id, field, value) =>
  apiFetch(`/items/${id}`, { method: "PATCH", body: { field, value } });
export const storeItemApi = body =>
  apiFetch(`/items`, { method: "POST", body });
export const uploadImageApi = body =>
  apiFetch(`/items/upload`, { method: "POST", body, headers: {} }); //Let empty the content-type
export const uploadExcelApi = body =>
  apiFetch(`/items/import`, { method: "POST", body, headers: {} }); //Let empty the content-type
export const deleteItemApi = id =>
  apiFetch(`/items/delete/${id}`, { method: "GET" });
export const duplicateItemApi = id =>
  apiFetch(`/items/duplicate/${id}`, { method: "GET" });
export const addItemLog = (_pk_item_editorial, reason) =>
  apiFetch(`/itemLogs/addItemLog/${_pk_item_editorial}`, {
    method: "POST",
    body: { reason }
  });
export const getSubDivisionsApi = divisionId =>
  apiFetch(`/subdivisions/${divisionId}`);
