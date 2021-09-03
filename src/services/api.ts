import axios from "axios";
import { parseCookies } from "nookies";

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_TCC,
    headers: {
      token: `Bearer ${cookies["TccToken"]}`,
    },
  });

  return api;
}

export const api = setupAPIClient();
