import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const getUser = () => {
  const userStr = sessionStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

export const setUserSession = (token: string, user: any) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
  // sessionStorage.setItem("isToken", "yes");
};

export const removeUserSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
