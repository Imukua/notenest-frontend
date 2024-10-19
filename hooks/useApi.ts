import TokenStore from "@/lib/auth/tokenstore";
import {ApiMethod}  from "@/lib/types/types";

const apiUrl = process.env.API_BASE_URL;

const sendRequest = (
  method: ApiMethod,
  path: string,
  // eslint-disable-next-line
  body?: any,
  authToken?: string | null,
  init?: RequestInit,
) => {  
  return fetch( "http://localhost:3000" + path, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
      ...init?.headers,
    },
  }).then((response) => {
    
    if (response.status >= 500) {
      throw response;
    }
    return response.json().then((data) => ({
      status: response.status,
      data,
    }));
  });
};

const sendProtectedRequest = (
  method: ApiMethod,
  path: string,
  // eslint-disable-next-line
  body?: any,
  useRefreshToken = false,
  init?: RequestInit,
) => {
  const authToken = useRefreshToken
    ? TokenStore.getRefreshToken()
    : TokenStore.getAccessToken();
  if (!authToken) {
    throw new Error("No auth token found");
  }

  return sendRequest(method, path, body, authToken, init);
};

export const useApi = () => {
  return { sendRequest, sendProtectedRequest };
};
