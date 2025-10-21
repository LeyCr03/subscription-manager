import { QueryFunction } from '@tanstack/react-query';
import Cookies from "js-cookie";
import { redirect } from 'next/navigation';

const serverUrl = process.env.SERVER || "http://localhost:3001"; // Correct variable name

export const createFetchWithAuth = () => {
  const fetchWithAuthorization  = async (url: string, options: RequestInit = {}): Promise<any> => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    try {
      const response = await fetch(`${serverUrl}${url}`, options);

      if (response.status === 401) {
        const refreshToken = Cookies.get('refreshToken');

        if (!refreshToken) {
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          redirect('/auth/login');
          return;
        }

        const refreshResponse = await fetch(`${serverUrl}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshResponse.json();

          Cookies.set('accessToken', newAccessToken, { expires: 1 / 48 });
          Cookies.set('refreshToken', newRefreshToken, { expires: 7 });

          const newOptions = {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${newAccessToken}`,
            },
          };

          const retryResponse = await fetch(`${serverUrl}${url}`, newOptions);

          if (!retryResponse.ok) {
            throw new Error(`Request failed after token refresh with status: ${retryResponse.status}`);
          }

          return await retryResponse.json();
        } else {
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          redirect('/auth/login');
          return;
        }
      }

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  const fetchWithAuth: QueryFunction = async ({ queryKey }) => {
    const [url] = queryKey;
    if (typeof url !== 'string') {
      throw new Error(`Expected queryKey[0] to be a string, but got: ${typeof url}`);
    }

    return fetchWithAuthorization(url);
  };

  return { fetchWithAuthorization, fetchWithAuth };
};