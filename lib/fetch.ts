import { QueryFunction } from '@tanstack/react-query';
import Cookies from "js-cookie";
import { redirect } from 'next/navigation';

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001";

export const createFetchWithAuth = () => {
  const fetchWithAuthorization = async (path: string, options: RequestInit = {}): Promise<any> => {
    let accessToken = Cookies.get('accessToken');
    let response: Response;
    let didRefresh = false;

    const makeRequest = async (token: string | undefined) => {
      const headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      return fetch(`${serverUrl}${path}`, {
        ...options,
        headers,
      });
    };

    try {
      response = await makeRequest(accessToken);

      // --- AUTHENTICATION FAILURE HANDLING (401) ---
      if (response.status === 401 && !didRefresh) {
        const refreshToken = Cookies.get('refreshToken');

        if (!refreshToken) {
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          redirect('/auth/login'); 
        }

        const refreshResponse = await fetch(`${serverUrl}/api/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshResponse.json();

          Cookies.set('accessToken', newAccessToken, { expires: 1 / 48 }); // 30 min
          Cookies.set('refreshToken', newRefreshToken, { expires: 7 });

          accessToken = newAccessToken; // Update token for retry
          didRefresh = true;
          response = await makeRequest(accessToken); // Retry the original request
        } else {
          // If refresh itself fails
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          redirect('/auth/login');
        }
      }
      // If response is still not OK after potential refresh or if it was never 401
      if (!response.ok) {
        if (response.status === 401) {
             Cookies.remove('accessToken');
             Cookies.remove('refreshToken');
             redirect('/auth/login'); // Final redirect if authentication still fails
        }

        // For other non-OK statuses (e.g., 400, 403, 404, 500), throw a generic Error
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(errorData.message || `Request failed with status: ${response.status}`);
      }

      // If the response is OK, try to parse JSON
      const text = await response.text();
      if (!text) {
          return null; // Handle 204 No Content or empty bodies gracefully
      }
      try {
          return JSON.parse(text);
      } catch (e) {
          console.error("Failed to parse JSON response for path:", path, "Error:", e, "Text:", text);
          throw new Error("Invalid JSON response from server.");
      }

    } catch (error) {
      console.error("Fetch error in fetchWithAuthorization for path:", path, error);
      throw error;
    }
  };

  // This is specifically for TanStack Query, which expects a QueryFunction
  const fetchWithAuth: QueryFunction = async ({ queryKey }) => {
    const [path] = queryKey;
    if (typeof path !== 'string') {
      throw new Error(`Expected queryKey[0] to be a string, but got: ${typeof path}`);
    }
    return fetchWithAuthorization(path);
  };

  return { fetchWithAuthorization, fetchWithAuth };
};


/*export const createFetchWithAuth = () => {
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
};*/