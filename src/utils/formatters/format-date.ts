export const formatDate = (date: Date): string => date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
