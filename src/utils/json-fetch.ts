export const jsonFetch = <T>(url: string): Promise<T> => fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`error fetching (${url}): ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  });
