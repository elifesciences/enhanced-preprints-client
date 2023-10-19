export const jsonFetchOrNull = <T>(url: string): Promise<T | null> => fetch(url)
  .then((response) => {
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`error fetching (${url}): ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  });

export const jsonFetch = <T>(url: string): Promise<T> => fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`error fetching (${url}): ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  });
