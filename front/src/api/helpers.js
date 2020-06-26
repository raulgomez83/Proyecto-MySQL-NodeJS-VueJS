import axios from "axios";

export function deleteAuth_Token() {
  axios.defaults.headers.common["Authorization"] = "";
  localStorage.removeItem("token");
}
export function deleteRole() {
  return localStorage.removeItem("role");
}
export function deleteId() {
  return localStorage.removeItem("id");
}
export function deleteUsername() {
  return localStorage.removeItem("username");
}
export function logOut() {
  deleteId();
  deleteRole();
  deleteUsername();
  deleteAuth_Token();
}
export function showUserButton() {
  const role = localStorage.getItem("role");
  if (role === "loader" || role === "normal" || role === "admin") {
    return true;
  }
  return false;
}
export function showAdminButton() {
  const role = localStorage.getItem("role");
  if (role === "admin") {
    return true;
  }
  return false;
}
export const server = "http://localhost:3004/";
