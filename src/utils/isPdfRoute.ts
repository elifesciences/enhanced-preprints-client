import { usePathname } from 'next/navigation';

const isPdfRoute = (): boolean => {
  const pathName = usePathname();
  return pathName.endsWith('/pdf');
};

export { isPdfRoute };
