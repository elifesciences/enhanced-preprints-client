export function generateGoogleScholarLink(query: Record<string, string | string[] | number | undefined>): string {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        params.append(key, String(item));
      });
    } else {
      params.append(key, String(value));
    }
  });

  return `https://scholar.google.com/scholar_lookup?${params.toString()}`;
}
