import axios from "axios";
const { format } = require("date-fns");

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
  if (role === "loader" || role === "normal") {
    return true;
  }
  return false;
}
export function isLoggin() {
  const token = localStorage.getItem("token");
  if (token) {
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
export function validateToken() {
  return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`);
}

export const server = "http://localhost:3004/";
export const token = localStorage.getItem("token");
export const data = localStorage.getItem("id");
