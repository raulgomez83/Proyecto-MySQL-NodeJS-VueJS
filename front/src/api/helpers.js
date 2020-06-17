export function LogOut() {
  axios.defaults.headers.common["Authorization"] = "";
  clearAuthToken();
  clearRole();
  clearId();
  clearUsername();
}
export function clearRole() {
  return localStorage.removeItem("role");
}
export function clearAuthToken() {
  return localStorage.removeItem("authToken");
}
export function clearId() {
  return localStorage.removeItem("id");
}
export function clearUsername() {
  return localStorage.removeItem("username");
}
