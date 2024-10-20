import TokenStore from "@/lib/auth/tokenstore";
import { Routes } from "@/lib/routes/routes";
import {ApiMethod}  from "@/lib/types/types";

const apiUrl = process.env.API_BASE_URL;

const sendRefreshToken = async (): Promise<void> => {
  try {
    const { status, data } = await sendProtectedRequest(
      ApiMethod.POST,
      Routes.auth.refresh,
      {},
      true
    );

    if (status === 201) {
      TokenStore.setAccessToken(data.accessToken);
    } else {
      throw new Error('Failed to refresh token');
    }
  } catch (err) {
    throw new Error('Error refreshing token');
  }
};


const sendRequest = async (
  method: ApiMethod,
  path: string,
  // eslint-disable-next-line
  body?: any,
  authToken?: string | null,
  init?: RequestInit,
) => {
  const fetchRequest = async (token: string | null) => {
    return fetch("http://localhost:3000" + path, {
      method,
      ...(body && { body: JSON.stringify(body) }),
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `bearer ${token}` }),
        ...init?.headers,
      },
    });
  };

  console.log("auth token used", authToken);

  let response = await fetchRequest(authToken ?? null);

  if (response.status === 401) {
    try {
      await sendRefreshToken(); 
      const newAuthToken = TokenStore.getAccessToken();
      response = await fetchRequest(newAuthToken);
    } catch (error) {
      throw new Error('Unable to refresh token');
    }
  }

  if (response.status >= 500) {
    throw response;
  }

  const data = await response.json();
  return {
    status: response.status,
    data,
  };
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
