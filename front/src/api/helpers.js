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
export function showProfileButton() {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
}
export function formatDateToDB(date) {
  return format(date, "MM-dd-yyyy");
}
