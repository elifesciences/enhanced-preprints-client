export function generateGoogleScholarLink(query: Record<string, string | string[]>): string {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        params.append(key, item);
      });
    } else {
      params.append(key, value);
    }
  });

  return `https://scholar.google.com/scholar_lookup?${params.toString()}`;
}
