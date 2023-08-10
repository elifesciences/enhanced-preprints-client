export const jsonFetch = <T>(url: string): Promise<T | null> => fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`error fetching (${url}): ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  });
